using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface IGetForeignKeyDetails<ReturnType1, ReturnType2, ParamIdType>
    {
        ReturnType1 GetAllWithDetails();
        ReturnType2 GetDetails(ParamIdType paramId);
    }
}
