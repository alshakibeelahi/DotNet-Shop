using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface IDetailedSearch<ReturnType, ParamIdType>
    {
        ReturnType GetBySearchCredentials(ParamIdType name);
    }
}
