using DAL.Entities;
using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repos
{
    internal class ReportRepo : BaseRepo, IReport<int, DateTime, ProductOrderMap, ProductOrderMap, ProductOrderMap>
    {
        public List<ProductOrderMap> BarCharts()
        {
            throw new NotImplementedException();
        }

        public List<ProductOrderMap> MonthlyRevenueReport(int month, int year)
        {
            var revenueReport = (from pom in mmContext.ProductOrderMaps
                                 join o in mmContext.Orders on pom.OrderId equals o.Id
                                 select pom).ToList();
            return revenueReport;
        }

        public List<ProductOrderMap> MonthlySalesReport(int month, int year)
        {
            var salesReport = (from pom in mmContext.ProductOrderMaps
                               join o in mmContext.Orders on pom.OrderId equals o.Id
                               select pom).ToList();
            return salesReport;
        }
    }
}
