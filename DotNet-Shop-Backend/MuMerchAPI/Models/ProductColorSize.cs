using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MuMerchAPI.Models
{
    public class ProductColorSize
    {
        public int Id { get; set; }

        public string Image { get; set; }

        public decimal SellingPrice { get; set; }

        public string Color { get; set; }

        public string Size { get; set; }

        public int Quantity { get; set; }
    }
}