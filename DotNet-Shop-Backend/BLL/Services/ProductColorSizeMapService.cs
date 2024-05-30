using BLL.DTOs;
using DAL.Entities;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class ProductColorSizeMapService
    {
        public static List<ProductDetails> GetAll()
        {
            var data = DataAccess.ProductColorSizeMapContent().GetAllWithDetails();
            return data.Select(map => new ProductDetails
            {
                Id = map.Id,
                ProductId = map.ProductId,
                ColorId = map.ColorId,
                SizeId = map.SizeId,
                ProductName = map.Product.Name,
                SellingPrice = map.Product.SellingPrice,
                Quantity = map.Quantity,
                Image = map.Product.Image,
                Color = map.Color.Name,
                Size = map.Size.Name,
            }).ToList();
        }

        public static ProductColorSizeMapDTO Get(int id)
        {
            var data = DataAccess.ProductColorMapContent().GetById(id);
            return Convert(data);
        }

        public static ProductColorSizeMapDTO GetProductAvailability(ProductColorSizeMapDTO checkProduct)
        {
            var data = Convert(checkProduct);
            var result = DataAccess.ProductColorSizeSearchContent().GetBySearchCredentials(data);
            return Convert(result);
        }

        public static int Add(ProductColorSizeMapDTO dto)
        {
            var data = Convert(dto);
            return DataAccess.ProductColorMapContent().Insert(data);
        }
        public static int Delete(ProductColorSizeMapDTO dto)
        {
            var data = Convert(dto);
            return DataAccess.ProductColorMapContent().Delete(data);
        }
        public static int Edit(ProductColorSizeMapDTO dto)
        {
            var data = Convert(dto);
            return DataAccess.ProductColorMapContent().Update(data);
        }
        static List<ProductColorSizeMap> Convert(List<ProductColorSizeMapDTO> nwz)
        {
            var data = new List<ProductColorSizeMap>();
            foreach (ProductColorSizeMapDTO ns in nwz)
            {
                data.Add(Convert(ns));
            }
            return data;
        }

        static ProductColorSizeMap Convert(ProductColorSizeMapDTO product)
        {
            return new ProductColorSizeMap()
            { 
                ProductId= product.ProductId,
                ColorId = product.ColorId,
                SizeId = product.SizeId,
                Quantity = product.Quantity,
            };

        }
        static List<ProductColorSizeMapDTO> Convert(List<ProductColorSizeMap> nwz)
        {
            var data = new List<ProductColorSizeMapDTO>();
            foreach (ProductColorSizeMap ns in nwz)
            {
                data.Add(Convert(ns));
            }
            return data;
        }

        static ProductColorSizeMapDTO Convert(ProductColorSizeMap product)
        {
            return new ProductColorSizeMapDTO()
            {
                ProductId = product.ProductId,
                ColorId = product.ColorId,
                SizeId = product.SizeId,
                Quantity= product.Quantity,
            };
        }
    }
}
