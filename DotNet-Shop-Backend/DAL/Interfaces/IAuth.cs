using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface IAuth<ReturnType,PType1, PType2>
    {
        ReturnType Authenticate(PType1 id, PType2 password);
    }
}
