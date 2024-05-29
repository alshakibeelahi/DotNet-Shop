using AutoMapper;
using BLL.DTOs;
using DAL.Entities;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class SizeService
    {
        public static List<SizeDTO> GetAll()
        {
            var data = DataAccess.SizeContent().GetAll();
            var cfg = new MapperConfiguration(c => {
                c.CreateMap<Size, SizeDTO>();
            });

            var mapper = new Mapper(cfg);
            var mapped = mapper.Map<List<SizeDTO>>(data);
            return mapped;
        }
        public static SizeDTO Get(int id)
        {
            var data = DataAccess.SizeContent().GetById(id);
            var cfg = new MapperConfiguration(c => {
                c.CreateMap<Size, SizeDTO>();
            });

            var mapper = new Mapper(cfg);
            var mapped = mapper.Map<SizeDTO>(data);
            return mapped;
        }

        public static SizeDTO GetByName(string name)
        {
            var data = DataAccess.SizeByNameContent().GetByName(name);
            var cfg = new MapperConfiguration(c => {
                c.CreateMap<Size, SizeDTO>();
            });

            var mapper = new Mapper(cfg);
            var mapped = mapper.Map<SizeDTO>(data);
            return mapped;
        }

        public static int Add(SizeDTO dto)
        {
            var cfg = new MapperConfiguration(c => {
                c.CreateMap<SizeDTO, Size>();
            });

            var mapper = new Mapper(cfg);
            var mapped = mapper.Map<Size>(dto);
            return DataAccess.SizeContent().Insert(mapped);
        }
        public static int Delete(SizeDTO dto)
        {
            var cfg = new MapperConfiguration(c => {
                c.CreateMap<SizeDTO, Size>();
            });

            var mapper = new Mapper(cfg);
            var mapped = mapper.Map<Size>(dto);
            return DataAccess.SizeContent().Delete(mapped);
        }
        public static int Edit(SizeDTO dto)
        {
            var cfg = new MapperConfiguration(c => {
                c.CreateMap<SizeDTO, Size>();
            });

            var mapper = new Mapper(cfg);
            var mapped = mapper.Map<Size>(dto);
            return DataAccess.SizeContent().Update(mapped);
        }
    }
}
