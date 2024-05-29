using AutoMapper;
using BLL.DTOs;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class ReportService
    {
        /*public static List<ProductOrderMapDTO> MonthlySalesReport(int month, int year)
        {
            var data = DataAccess.ReportContent().MonthlySalesReport(month, year);
            var cfg = new MapperConfiguration(c => {
                c.CreateMap<ProductOrderMap, ProductOrderMapDTO>();
            });

            var mapper = new Mapper(cfg);
            var mapped = mapper.Map<List<ProductOrderMapDTO>>(data);
            return mapped;
        }
        public static List<ProductOrderMapDTO> MonthlyRevenueReport(int month, int year)
        {
            var data = DataAccess.ReportContent().MonthlyRevenueReport(month, year);
            var cfg = new MapperConfiguration(c => {
                c.CreateMap<ProductOrderMap, ProductOrderMapDTO>();
            });

            var mapper = new Mapper(cfg);
            var mapped = mapper.Map<List<ProductOrderMapDTO>>(data);
            return mapped;
        }
        public static List<ProductsSalesDataDTO> MonthlySalesBarCharts()
        {
            var data = DataAccess.ReportContent().BarCharts();
            var cfg = new MapperConfiguration(c => {
                c.CreateMap<ProductsSalesDataDTO, ProductsSalesData>();
            });

            var mapper = new Mapper(cfg);
            var mapped = mapper.Map<List<ProductsSalesDataDTO>>(data);
            return mapped;
        }*/
    }
}
