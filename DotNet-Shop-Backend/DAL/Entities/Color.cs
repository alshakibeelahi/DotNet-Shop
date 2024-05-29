using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace DAL.Entities
{
    public class Color
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        public virtual ICollection<ProductColorSizeMap> ProductColorSizes { get; set; }

        public Color()
        {
            ProductColorSizes = new List<ProductColorSizeMap>();
        }
    }
}
