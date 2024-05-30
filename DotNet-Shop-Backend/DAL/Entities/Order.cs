using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    public class Order
    {
        [Key]
        [Required]
        public int Id { get; set; }
        public string OrderStatus { get; set; }
        public string PaymentStatus { get; set; }
        public string ShippingAddress { get; set; }
        public string ContactNumber { get; set; }
        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<ProductOrderMap> ProductOrderMaps { get; set; }

        public Order()
        {
            ProductOrderMaps = new List<ProductOrderMap>();
        }
    }
}
