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
    public class OrderDTO
    {
        public int Id { get; set; }
        public string OrderStatus { get; set; }
        public string PaymentStatus { get; set; }
        public string UserId { get; set; }
        public string ShippingAddress { get; set; }
        public string ContactNumber { get; set; }
    }
}
