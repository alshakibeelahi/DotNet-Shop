using DAL.Entities;
using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repos
{
    internal class ColorRepo : BaseRepo, IBaseRepo<Color, int, int, Color>, ISearchByName<Color, string>
    {
        public List<Color> GetAll()
        {
            return mmContext.Colors.ToList();
        }

        public Color GetById(int id)
        {
            return mmContext.Colors.Find(id);
        }

        public Color GetByName(string name)
        {
            var colorData = mmContext.Colors.FirstOrDefault(c => c.Name == name);
            if (colorData == null)
            {
                var newColor = new Color { Name = name };
                mmContext.Colors.Add(newColor);
                mmContext.SaveChanges();
                return newColor;
            }
            return colorData;
        }

        public int Insert(Color color)
        {
            mmContext.Colors.Add(color);
            return mmContext.SaveChanges();
        }

        public int Update(Color color)
        {
            var data = mmContext.Colors.Find(color.Id);
            data.Name = color.Name;
            return mmContext.SaveChanges();
        }

        public int Delete(Color color)
        {
            var data = mmContext.Colors.Find(color.Id);
            mmContext.Colors.Remove(data);
            return mmContext.SaveChanges();
        }
    }
}

