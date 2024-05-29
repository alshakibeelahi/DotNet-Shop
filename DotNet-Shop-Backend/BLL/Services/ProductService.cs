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
    public class ProductService
    {

        public static List<ProductDTO> GetAll()
        {
            var data = DataAccess.ProductContent().GetAll();
            return Convert(data);
        }
        public static ProductDTO Get(int id)
        {
            var data = DataAccess.ProductContent().GetById(id);
            return Convert(data);
        }
        public static int Add(ProductDTO dto)
        {
            var data = Convert(dto);
            return DataAccess.ProductContent().Insert(data);
        }
        public static int Delete(ProductDTO dto)
        {
            var data = Convert(dto);
            return DataAccess.ProductContent().Delete(data);
        }
        public static int Edit(ProductDTO dto)
        {
            var data = Convert(dto);
            return DataAccess.ProductContent().Update(data);
        }
        static List<Product> Convert(List<ProductDTO> nwz)
        {
            var data = new List<Product>();
            foreach (ProductDTO ns in nwz)
            {
                data.Add(Convert(ns));
            }
            return data;
        }

        static Product Convert(ProductDTO product)
        {
            return new Product()
            {
                Name = product.Name,
                Image= product.Image,
                SellingPrice= product.SellingPrice, 
            };
        }
        static List<ProductDTO> Convert(List<Product> nwz)
        {
            var data = new List<ProductDTO>();
            foreach (Product ns in nwz)
            {
                data.Add(Convert(ns));
            }
            return data;
        }

        static ProductDTO Convert(Product product)
        {
            return new ProductDTO()
            {
                Name = product.Name,
                Image = product.Image,
                SellingPrice = product.SellingPrice,
            };
        }
    }
}

