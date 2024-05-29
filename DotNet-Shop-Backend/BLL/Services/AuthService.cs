using AutoMapper;
using BLL.DTOs;
using DAL;
using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class AuthService
    {
        public static TokenDTO Autheticate(string id, string password)
        {
            var data = DataAccess.AuthContent().Authenticate(id, password);
            if (data)
            {
                var token = new Token();
                token.UserId = id;
                token.UpdatedAt = DateTime.Now;
                token.TokenKey = Guid.NewGuid().ToString();
                var res = DataAccess.TokenContent().Insert(token);
                if(res!=null)
                {
                    var cfg = new MapperConfiguration(c =>
                    {
                        c.CreateMap<Token, TokenDTO>();
                    });
                    var mapper = new Mapper(cfg);
                    return mapper.Map<TokenDTO>(res);
                }
            }
            return null;
        }

        public static bool IsTokenValid(string TokenKey)
        {
            var data = DataAccess.TokenContent().GetById(TokenKey);
            if(data!=null && data.ExpiredAt == null)
            {
                return true;
            }
            return false;
        }

        public static bool Logout(string tokenKey)
        {
            var exToken = DataAccess.TokenContent().GetById(tokenKey);
            exToken.ExpiredAt = DateTime.Now;
            var data = DataAccess.TokenContent().Update(exToken);
            if(data!=null )
            {
                return true;
            }
            return false;
        }

        public static bool IsAdmin(string tokenKey)
        {
            var extk = DataAccess.TokenContent().GetById(tokenKey);
            if (IsTokenValid(tokenKey) && extk.User.UserType.Equals("admin"))
            {
                return true;
            }
            return false;
        }

        public static bool IsEmployee(string tokenKey)
        {
            var extk = DataAccess.TokenContent().GetById(tokenKey);
            if (IsTokenValid(tokenKey) && extk.User.UserType.Equals("Employee"))
            {
                return true;
            }
            return false;
        }

        public static bool IsBandManager(string tokenKey)
        {
            var extk = DataAccess.TokenContent().GetById(tokenKey);
            if (IsTokenValid(tokenKey) && extk.User.UserType.Equals("BandManager"))
            {
                return true;
            }
            return false;
        }

        public static bool IsGigManager(string tokenKey)
        {
            var extk = DataAccess.TokenContent().GetById(tokenKey);
            if (IsTokenValid(tokenKey) && extk.User.UserType.Equals("GigManager"))
            {
                return true;
            }
            return false;
        }
    }
}
