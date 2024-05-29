using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DAL.Entities
{
    public class User
    {
        [Required]
        [StringLength(70)]
        public string Name { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        public string BloodGroup { get; set; }
        [Required]
        public string Password { get; set; }
        [Key]
        [Required]
        public string Username { get; set; }
        [Required]
        public string UserType { get; set; }
        [Required]
        [StringLength(70)]
        public string Email { get; set; }
        [Required]
        [StringLength(11)]
        public string PhoneNo { get; set; }
        public virtual ICollection<Order> Orders { get; set; }

        public User()
        {
            Orders = new List<Order>();
        }
    }
}
