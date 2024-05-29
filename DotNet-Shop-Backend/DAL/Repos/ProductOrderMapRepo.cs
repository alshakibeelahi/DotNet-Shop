using DAL.Entities;
using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repos
{
        internal class ProductOrderMapRepo : BaseRepo, IBaseRepo<ProductOrderMap, int, int, ProductOrderMap>
        {
            public List<ProductOrderMap> GetAll()
            {
                return mmContext.ProductOrderMaps.ToList();
            }

            public ProductOrderMap GetById(int id)
            {
                return mmContext.ProductOrderMaps.Find(id);
            }

            public int Insert(ProductOrderMap obj)
            {
                mmContext.ProductOrderMaps.Add(obj);
                return mmContext.SaveChanges();
            }

            public int Update(ProductOrderMap obj)
            {
                var data = mmContext.ProductOrderMaps.Find(obj.Id);
                data.Price = obj.Price;
                data.OrderedQuantity = obj.OrderedQuantity;
                data.Color = obj.Color;
                data.Size = obj.Size;
                data.ProductName = obj.ProductName;
                return mmContext.SaveChanges();

            }
            public int Delete(ProductOrderMap grade)
            {
                var data = mmContext.ProductOrderMaps.Find(grade.Id);
                mmContext.ProductOrderMaps.Remove(data);
                return mmContext.SaveChanges();
            }
        }
 }
