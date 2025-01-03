﻿using DAL.Entities;
using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;
using System.Xml.Linq;

namespace DAL.Repos
{
    internal class UserRepo : BaseRepo, IBaseRepo<User, int, string, User>, IAuth<Object, string, string>
    {
        public Object Authenticate(string username, string password)
        {
            var data = mmContext.Users
                        .Where(u => u.Username.Equals(username) && u.Password.Equals(password))
                        .Select(u => new
                        {
                            u.Name,
                            u.Username,
                            u.Email,
                            u.PhoneNo,
                            u.UserType
                        })
                        .SingleOrDefault();
            if (data!=null) return data;
            return null;
        }

        public int Delete(User user)
        {
            var data = mmContext.Users.Find(user.Username);
            mmContext.Users.Remove(user);
            return mmContext.SaveChanges();
        }

        public List<User> GetAll()
        {
            return mmContext.Users.ToList();
        }

        public User GetById(string id)
        {
            var data = mmContext.Users.Find(id);
            return data;
        }

        public int Insert(User obj)
        {
            mmContext.Users.Add(obj);
            return mmContext.SaveChanges();
        }

        public int Update(User obj)
        {
            var data = mmContext.Users.Find(obj.Username);
            data.Name = obj.Name;
            data.BloodGroup = obj.BloodGroup;
            data.Password = obj.Password;
            data.UserType = obj.UserType;
            data.Email = obj.Email;
            data.PhoneNo = obj.PhoneNo;
            return mmContext.SaveChanges();

        }
    }
}
