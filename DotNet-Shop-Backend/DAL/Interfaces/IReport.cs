using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface IReport<PMY, PDate, RSales, RRevenue, RBarCharts>
    {
        List<RSales> MonthlySalesReport(PMY month, PMY year);
        List<RRevenue> MonthlyRevenueReport(PMY month, PMY year);
        List<RBarCharts> BarCharts();
    }
}
