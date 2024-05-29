using BLL.DTOs;
using DAL.Entities;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

namespace BLL.Services
{
    public class CategoryService
    {
        public static List<CategoryDTO> GetAll()
        {
            var data = DataAccess.CategoryContent().GetAll();
            var cfg = new MapperConfiguration(c => {
                c.CreateMap<Category, CategoryDTO>();
            });

            var mapper = new Mapper(cfg);
            var mapped = mapper.Map<List<CategoryDTO>>(data);
            return mapped;
        }
        public static CategoryDTO Get(int id)
        {
            var data = DataAccess.CategoryContent().GetById(id);
            var cfg = new MapperConfiguration(c => {
                c.CreateMap<Category, CategoryDTO>();
            });

            var mapper = new Mapper(cfg);
            var mapped = mapper.Map<CategoryDTO>(data);
            return mapped;
        }
        public static int Add(CategoryDTO dto)
        {
            var cfg = new MapperConfiguration(c => {
                c.CreateMap<CategoryDTO, Category>();
            });

            var mapper = new Mapper(cfg);
            var mapped = mapper.Map<Category>(dto);
            return DataAccess.CategoryContent().Insert(mapped);
        }
        public static int Delete(CategoryDTO dto)
        {
            var cfg = new MapperConfiguration(c => {
                c.CreateMap<CategoryDTO, Category>();
            });

            var mapper = new Mapper(cfg);
            var mapped = mapper.Map<Category>(dto);
            return DataAccess.CategoryContent().Delete(mapped);
        }
        public static int Edit(CategoryDTO dto)
        {
            var cfg = new MapperConfiguration(c => {
                c.CreateMap<CategoryDTO, Category>();
            });

            var mapper = new Mapper(cfg);
            var mapped = mapper.Map<Category>(dto);
            return DataAccess.CategoryContent().Update(mapped);
        }
    }
}
