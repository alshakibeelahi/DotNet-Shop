using BLL.DTOs;
using DAL.Entities;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Remoting.Contexts;

namespace BLL.Services
{
    public class ColorService
    {
        public static List<ColorDTO> GetAll()
        {
            var data = DataAccess.ColorContent().GetAll();
            return Convert(data);
        }
        public static ColorDTO Get(int id)
        {
            var data = DataAccess.ColorContent().GetById(id);
            return Convert(data);
        }

        public static ColorDTO GetByName(string name)
        {
            var data = DataAccess.ColorByNameContent().GetBySearchCredentials(name);
            return Convert(data);
        }


        public static int Add(ColorDTO dto)
        {
            var data = Convert(dto);
            return DataAccess.ColorContent().Insert(data);
        }
        public static int Delete(ColorDTO dto)
        {
            var data = Convert(dto);
            return DataAccess.ColorContent().Delete(data);
        }
        public static int Edit(ColorDTO dto)
        {
            var data = Convert(dto);
            return DataAccess.ColorContent().Update(data);
        }
        static List<Color> Convert(List<ColorDTO> clr)
        {
            var data = new List<Color>();
            foreach (ColorDTO cl in clr)
            {
                data.Add(Convert(cl));
            }
            return data;
        }

        static Color Convert(ColorDTO color)
        {
            return new Color()
            {
                Id = color.Id,
                Name = color.Name,
            };
        }
        static List<ColorDTO> Convert(List<Color> clr)
        {
            var data = new List<ColorDTO>();
            foreach (Color cl in clr)
            {
                data.Add(Convert(cl));
            }
            return data;
        }

        static ColorDTO Convert(Color color)
        {
            return new ColorDTO()
            {
                Id = color.Id,
                Name = color.Name,
            };
        }
    }
}
