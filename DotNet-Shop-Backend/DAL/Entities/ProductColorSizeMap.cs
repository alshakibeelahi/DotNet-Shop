using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class ProductColorSizeMap
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey("Product")]
        public int ProductId { get; set; }
        public virtual Product Product { get; set; }

        [Required]
        [ForeignKey("Color")]
        public int ColorId { get; set; }
        public virtual Color Color { get; set; }

        [Required]
        [ForeignKey("Size")]
        public int SizeId { get; set; }
        public virtual Size Size { get; set; }

        [Required]
        public int Quantity { get; set; }
    }
}
