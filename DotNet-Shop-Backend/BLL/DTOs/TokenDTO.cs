using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTOs
{
    public class TokenDTO
    {
        [StringLength(100)]
        public string TokenKey { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime? ExpiredAt { get; set; }
        public string UserId { get; set; }
        public virtual UserDTO UserDTO { get; set; }
    }
}
