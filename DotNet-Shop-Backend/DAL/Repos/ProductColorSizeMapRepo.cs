using DAL.Entities;
using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repos
{
    internal class ProductColorSizeMapRepo : BaseRepo, IBaseRepo<ProductColorSizeMap, int, int, ProductColorSizeMap>, IGetForeignKeyDetails<List<ProductColorSizeMap>, ProductColorSizeMap, int>
    {
        public List<ProductColorSizeMap> GetAll()
        {
            return mmContext.ProductColorSizeMaps.ToList();
        }

        public ProductColorSizeMap GetById(int id)
        {
            return mmContext.ProductColorSizeMaps.Find(id);
        }

        public List<ProductColorSizeMap> GetAllWithDetails()
        {
            return mmContext.ProductColorSizeMaps
                .Include("Product")
                .Include("Color")
                .Include("Size")
                .ToList();
        }


        public ProductColorSizeMap GetDetails(int id)
        {
            return mmContext.ProductColorSizeMaps.Find(id);
        }

        public int Insert(ProductColorSizeMap obj)
        {
            mmContext.ProductColorSizeMaps.Add(obj);
            return mmContext.SaveChanges();
        }

        public int Update(ProductColorSizeMap obj)
        {
            var data = mmContext.ProductColorSizeMaps.Find(obj.Id);
            data.ProductId = obj.ProductId;
            data.ColorId= obj.ColorId;
            return mmContext.SaveChanges();

        }
        public int Delete(ProductColorSizeMap grade)
        {
            var data = mmContext.ProductColorSizeMaps.Find(grade.Id);
            mmContext.ProductColorSizeMaps.Remove(data);
            return mmContext.SaveChanges();
        }
    }
}
