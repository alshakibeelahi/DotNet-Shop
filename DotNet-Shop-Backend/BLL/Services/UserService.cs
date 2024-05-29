using AutoMapper;
using BLL.DTOs;
using DAL;
using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class UserService
    {
        public static List<UserDTO> GetAll()
        {
            var data = DataAccess.UserContent().GetAll();
            var cfg = new MapperConfiguration(c => {
                c.CreateMap<User, UserDTO>();
            });

            var mapper = new Mapper(cfg);
            var mapped = mapper.Map<List<UserDTO>>(data);
            return mapped;
        }
        public static UserDTO Get(string id)
        {
            var data = DataAccess.UserContent().GetById(id);
            var cfg = new MapperConfiguration(c => {
                c.CreateMap<User, UserDTO>();
            });

            var mapper = new Mapper(cfg);
            var mapped = mapper.Map<UserDTO>(data);
            return mapped;
        }
        public static int Add(UserDTO dto)
        {
            var cfg = new MapperConfiguration(c => {
                c.CreateMap<UserDTO, User>();
            });

            var mapper = new Mapper(cfg);
            var mapped = mapper.Map<User>(dto);
            return DataAccess.UserContent().Insert(mapped);
        }
        public static int Delete(UserDTO dto)
        {
            var cfg = new MapperConfiguration(c => {
                c.CreateMap<UserDTO, User>();
            });

            var mapper = new Mapper(cfg);
            var mapped = mapper.Map<User>(dto);
            return DataAccess.UserContent().Delete(mapped);
        }
        public static int Edit(UserDTO dto)
        {
            var cfg = new MapperConfiguration(c => {
                c.CreateMap<UserDTO, User>();
            });

            var mapper = new Mapper(cfg);
            var mapped = mapper.Map<User>(dto);
            return DataAccess.UserContent().Update(mapped);
        }
    }
}
