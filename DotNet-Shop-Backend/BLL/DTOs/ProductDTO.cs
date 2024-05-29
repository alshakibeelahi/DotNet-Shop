using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTOs
{
    public class ProductDTO
    {
        [Required]
        [StringLength(150)]
        public string Name { get; set; }
        public string Image { get; set; }
        public decimal SellingPrice { get; set; }
    }
}
