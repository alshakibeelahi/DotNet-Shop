using BLL.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MuMerchAPI.Models
{
    public class Order
    {
        public string OrderStatus { get; set; }
        public string PaymentStatus { get; set; }
        public string UserId { get; set; }
        public string ContactNumber { get; set; }
        public string ShippingAddress { get; set; }
        public List<OrderedProduct> ProductOrderMaps { get; set; }
    }
}