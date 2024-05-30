using DAL.Entities;
using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repos
{
    internal class SizeRepo : BaseRepo, IBaseRepo<Size, int, int, Size>, IDetailedSearch<Size, string>
    {
        public int Delete(Size size)
        {
            var data = mmContext.Sizes.Find(size.Id);
            mmContext.Sizes.Remove(size);
            return mmContext.SaveChanges();
        }

        public List<Size> GetAll()
        {
            return mmContext.Sizes.ToList();
        }

        public Size GetBySearchCredentials(string name)
        {
            var sizeData = mmContext.Sizes.FirstOrDefault(c => c.Name == name);
            if (sizeData == null)
            {
                var newSize = new Size { Name = name };
                mmContext.Sizes.Add(newSize);
                mmContext.SaveChanges();
                return newSize;
            }
            return sizeData;
        }

        public Size GetById(int id)
        {
            var data = mmContext.Sizes.Find(id);
            return data;
        }

        public int Insert(Size obj)
        {
            mmContext.Sizes.Add(obj);
            return mmContext.SaveChanges();
        }

        public int Update(Size obj)
        {
            var data = mmContext.Sizes.Find(obj.Id);
            mmContext.Entry(data).CurrentValues.SetValues(obj);
            return mmContext.SaveChanges();
        }
    }
}
