using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repos
{
    internal class BaseRepo
    {
        internal MMContext mmContext;
        internal BaseRepo()
        {
            mmContext= new MMContext();
        }
    }
}
