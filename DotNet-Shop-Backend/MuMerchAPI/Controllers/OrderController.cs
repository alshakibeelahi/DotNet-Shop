using BLL.DTOs;
using BLL.Services;
using MuMerchAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace MuMerchAPI.Controllers
{
    [EnableCors("*", "*", "*")]
    public class OrderController : ApiController
    {
        [HttpGet]
        [Route("api/order/all")]
        public HttpResponseMessage AllOrders()
        {
            try
            {
                var data = OrderService.GetAll();
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
        [HttpGet]
        [Route("api/order/{id}")]
        public HttpResponseMessage Order(int id)
        {
            try
            {
                var data = OrderService.Get(id);
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
        }
        [HttpPost]
        [Route("api/order/add")]
        public HttpResponseMessage Add(Order order)
        {
            try
            {
                var orderData = new OrderDTO
                {
                    OrderStatus = "Pending",
                    PaymentStatus = "Pending",
                    UserId = order.UserId,
                };
                var orderId = OrderService.Add(orderData);

                foreach (var productOrderMap in order.ProductOrderMaps)
                {
                    // Check if required fields are not empty
                    if (string.IsNullOrEmpty(productOrderMap.ProductName) ||
                        string.IsNullOrEmpty(productOrderMap.Size) ||
                        string.IsNullOrEmpty(productOrderMap.Color))
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "ProductName, Size, and Color are required.");
                    }



                    var orderedProduct = new ProductOrderMapDTO
                    {
                        ProductName = productOrderMap.ProductName,
                        Size = productOrderMap.Size,
                        Color = productOrderMap.Color,
                        Price = productOrderMap.Price,
                        OrderedQuantity = productOrderMap.OrderedQuantity,
                        CreatedAt = DateTime.Now,
                        OrderId = orderId
                    };
                    ProductOrderMapService.Add(orderedProduct);
                }

                return Request.CreateResponse(HttpStatusCode.OK, orderId);
            }
            catch (DbEntityValidationException ex)
            {
                // Retrieve validation errors
                var validationErrors = ex.EntityValidationErrors
                    .SelectMany(e => e.ValidationErrors)
                    .Select(error => $"{error.PropertyName}: {error.ErrorMessage}");

                // Log or handle validation errors appropriately
                var errorMessage = string.Join(Environment.NewLine, validationErrors);
                // Return an error response with validation details
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, errorMessage);
            }
        }
        [HttpPost]
        [Route("api/order/edit")]
        public HttpResponseMessage Edit(OrderDTO orderDTO)
        {
            try
            {
                var data = OrderService.Edit(orderDTO);
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
        }
        [HttpPost]
        [Route("api/order/delete")]
        public HttpResponseMessage Delete(OrderDTO dto)
        {
            try
            {
                var data = OrderService.Delete(dto);
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
        }
    }
}
