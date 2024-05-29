using DAL.Entities;
using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repos
{
    internal class TokenRepo : BaseRepo, IBaseRepo<Token, Token, string, Token>
    {
        public Token Delete(Token id)
        {
            throw new NotImplementedException();
        }

        public List<Token> GetAll()
        {
            throw new NotImplementedException();
        }

        public Token GetById(string id)
        {
            if (id == null) throw new ArgumentNullException("id");
            return mmContext.Tokens.FirstOrDefault(t => t.TokenKey.Equals(id));
        }

        public Token Insert(Token obj)
        {
            mmContext.Tokens.Add(obj);
            if (mmContext.SaveChanges() > 0) return obj;
            return null;
        }

        public Token Update(Token obj)
        {
            var data = GetById(obj.TokenKey);
            mmContext.Entry(data).CurrentValues.SetValues(obj);
            if (mmContext.SaveChanges() > 0) return obj;
            return null;
        }
    }
}
