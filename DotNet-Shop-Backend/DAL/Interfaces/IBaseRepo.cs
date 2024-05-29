using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface IBaseRepo<ReturnType, IudReturnType, ParamIdType, ParamObjType>
    {
        List<ReturnType> GetAll();
        ReturnType GetById(ParamIdType id);
        IudReturnType Insert(ParamObjType obj);
        IudReturnType Update(ParamObjType obj);
        IudReturnType Delete(ParamObjType id);
    }
}
