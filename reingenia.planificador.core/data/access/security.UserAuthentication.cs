using System;
using System.Linq;

using reingenia.planificador.BusinessEntity.security;
using reingenia.planificador.Data.context;

namespace reingenia.planificador.Data.access
{

    internal class UserAuthenticationDAO : Manager<UserAuthenticationBE>
    {

        public UserAuthenticationBE GetByUser(Guid guidUserId)
        {
            using (DBContext Context = CreateContext())
                return Context.UserAuthentication.FirstOrDefault(x => x.UserId == guidUserId);
        }

    }

}
