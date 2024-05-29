using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class Product
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        [StringLength(150)]
        public string Name { get; set; }

        public string Image { get; set; }

        [Required]
        public decimal SellingPrice { get; set; }

        public virtual ICollection<ProductColorSizeMap> ProductColorSizes { get; set; }

        public Product()
        {
            ProductColorSizes = new List<ProductColorSizeMap>();
        }
    }
}
