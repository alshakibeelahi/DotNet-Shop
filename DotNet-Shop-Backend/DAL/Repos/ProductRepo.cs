using DAL.Entities;
using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repos
{
    internal class ProductRepo : BaseRepo, IBaseRepo<Product, int, int, Product>
    {
        public List<Product> GetAll()
        {
            return mmContext.Products.ToList();
        }

        public Product GetById(int id)
        {
            return mmContext.Products.Find(id);
        }

        public int Insert(Product obj)
        {
            mmContext.Products.Add(obj);
            mmContext.SaveChanges();
            return obj.Id;
        }

        public int Update(Product obj)
        {
            var data = mmContext.Products.Find(obj.Id);
            data.Name = obj.Name;
            data.Image = obj.Image;
            data.SellingPrice = obj.SellingPrice;
            return mmContext.SaveChanges();

        }
        public int Delete(Product grade)
        {
            var data = mmContext.Products.Find(grade.Id);
            mmContext.Products.Remove(data);
            return mmContext.SaveChanges();
        }
    }
}

