using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MuMerchAPI.Models
{
    public class OrderedProduct
    {
        public int Id { get; set; }

        public int ProductId { get; set; }
        public int ColorId { get; set; }
        public int SizeId { get; set; }
        public int Quantity { get; set; }
        public string ProductName { get; set; }
        public string Size { get; set; }
        public string Color { get; set; }
        public int Price { get; set; }
        public int OrderedQuantity { get; set; }
        public DateTime CreatedAt { get; set; }
        public int OrderId { get; set; }
    }
}