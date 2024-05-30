using BLL.DTOs;
using BLL.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using MuMerchAPI.Auth;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Threading.Tasks;
using System.Web;
using System.IO;
using System.Diagnostics;

namespace MuMerchAPI.Controllers
{
    [EnableCors(origins: "http://localhost:4000", headers: "*", methods: "*")]
    public class ProductController : ApiController
    {
        private static readonly string RootDirectory = HttpContext.Current.Server.MapPath("~/Uploads");

        [HttpGet]
        [Route("api/product/all")]
        public HttpResponseMessage AllProducts()
        {
            try
            {
                var data = ProductColorSizeMapService.GetAll(); // Specify the type argument explicitly
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpGet]
        [Route("api/product/{id}")]
        public HttpResponseMessage Product(int id)
        {
            try
            {
                var data = ProductService.Get(id);
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
        }

        [AdminAccess]
        [HttpPost]
        [Route("api/product/add")]
        public async Task<HttpResponseMessage> PostFormData()
        {
            // Check if the request contains multipart/form-data.
            if (Request.Content == null || !Request.Content.IsMimeMultipartContent())
            {
                return Request.CreateErrorResponse(HttpStatusCode.UnsupportedMediaType, "Invalid content type");
            }

            // Ensure the directory exists
            if (!Directory.Exists(RootDirectory))
            {
                Directory.CreateDirectory(RootDirectory);
            }

            var provider = new MultipartFormDataStreamProvider(RootDirectory);

            try
            {
                // Read the form data.
                await Request.Content.ReadAsMultipartAsync(provider);

                // Variables to hold form data
                string name = null;
                string quantityStr = null;
                string sellingPriceStr = null;
                string size = null;
                string color = null;
                byte[] imageData = null;

                // Extract form data
                foreach (var key in provider.FormData.AllKeys)
                {
                    foreach (var val in provider.FormData.GetValues(key))
                    {
                        Trace.WriteLine($"Key: {key}, Value: {val}");
                        if (key == "Name")
                        {
                            name = val;
                        }
                        else if (key == "Quantity")
                        {
                            quantityStr = val;
                        }
                        else if (key == "SellingPrice")
                        {
                            sellingPriceStr = val;
                        }
                        else if (key == "Size")
                        {
                            size = val;
                        }
                        else if(key == "Color")
                        {
                            color = val;
                        }
                    }
                }

                // Extract file data
                foreach (MultipartFileData file in provider.FileData)
                {
                    Trace.WriteLine(file.Headers.ContentDisposition.FileName);
                    Trace.WriteLine("Server file path: " + file.LocalFileName);

                    // Read the file into a byte array
                    imageData = File.ReadAllBytes(file.LocalFileName);
                }

                // Validate extracted data
                if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(quantityStr) || string.IsNullOrEmpty(sellingPriceStr))
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Missing product data");
                }

                if (!int.TryParse(quantityStr, out var quantity) || !decimal.TryParse(sellingPriceStr, out var sellingPrice))
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Invalid quantity or selling price");
                }

                // Construct the ProductDTO object
                var productDTO = new ProductDTO
                {
                    Name = name,
                    SellingPrice = sellingPrice,
                };

                string myFileName = null;

                // Process the image data (imageData) if necessary
                if (imageData != null)
                {
                    // Determine the correct file extension
                    string fileExtension = Path.GetExtension(provider.FileData[0].Headers.ContentDisposition.FileName.Trim('"'));
                    string fileName = Guid.NewGuid().ToString() + fileExtension; // Use correct extension
                    string filePath = Path.Combine(RootDirectory, fileName);
                    File.WriteAllBytes(filePath, imageData);

                    // Log file save success
                    Trace.WriteLine($"File saved successfully to: {filePath}");

                    // Set the image path in the DTO
                    myFileName = fileName;
                }

                // Generate the file URL
                string serverIp = "http://localhost:44377/"; // Replace with your server's IP address
                string imageUrl = $"{serverIp}/Uploads/{myFileName}";
                productDTO.Image = imageUrl;

                // Save product to database or perform other actions
                var productData = ProductService.Add(productDTO);
                var colorData = ColorService.GetByName(color);
                var sizeData = SizeService.GetByName(size);

                var productColorSizeMap = new ProductColorSizeMapDTO
                {
                    ColorId = colorData.Id,
                    SizeId = sizeData.Id,
                    Quantity = quantity,
                    ProductId = productData
                };

                var newProduct = ProductColorSizeMapService.Add(productColorSizeMap);

                //var colorData = ColorService
                return Request.CreateResponse(HttpStatusCode.OK, productColorSizeMap);
            }
            catch (Exception e)
            {
                Trace.WriteLine($"Exception: {e.Message}");
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }

        [HttpPost]
        [Route("api/product/edit")]
        public HttpResponseMessage Edit(ProductDTO productDTO)
        {
            try
            {
                var data = ProductService.Edit(productDTO);
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
        }

        [HttpPost]
        [Route("api/product/delete")]
        public HttpResponseMessage Delete(ProductDTO dto)
        {
            try
            {
                var data = ProductService.Delete(dto);
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
        }
    }
}
