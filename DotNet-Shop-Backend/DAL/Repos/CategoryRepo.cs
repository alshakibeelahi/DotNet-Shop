using DAL.Entities;
using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repos
{
    internal class CategoryRepo : BaseRepo, IBaseRepo<Category, int, int, Category>
    {
        public List<Category> GetAll()
        {
            return mmContext.Categories.ToList();
        }

        public Category GetById(int id)
        {
            return mmContext.Categories.Find(id);
        }

        public int Insert(Category ctg)
        {
            mmContext.Categories.Add(ctg);
            return mmContext.SaveChanges();
        }

        public int Update(Category ctg)
        {
            var data = mmContext.Categories.Find(ctg.Id);
            data.Id = ctg.Id;
            data.Name = ctg.Name;
            data.IsActive = ctg.IsActive;
            data.UpdatedAt = ctg.UpdatedAt;
            data.UpdatedBy = ctg.UpdatedBy;
            return mmContext.SaveChanges();

        }
        public int Delete(Category category)
        {
            var data = mmContext.Categories.Find(category.Id);
            mmContext.Categories.Remove(data);
            return mmContext.SaveChanges();
        }
    }
}
