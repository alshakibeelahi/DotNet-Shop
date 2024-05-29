using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTOs
{
    public class UserDTO
    {
        [Required]
        [StringLength(150)]
        public string Name { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        public string BloodGroup { get; set; }
        [Required]
        public string Password { get; set; }
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
    }
}
