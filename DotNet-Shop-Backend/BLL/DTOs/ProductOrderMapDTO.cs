using DAL.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTOs
{
    public class ProductOrderMapDTO
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public string Size { get; set; }
        public string Color { get; set; }
        public int Price { get; set; }
        public int OrderedQuantity { get; set; }
        public DateTime CreatedAt { get; set; }
        public int OrderId { get; set; }
    }
}
