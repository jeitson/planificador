using System;
using System.Linq;

using reingenia.Library;
using reingenia.planificador.BusinessEntity.security;
using reingenia.planificador.Data.context;

namespace reingenia.planificador.Data.access
{

    internal class UserSessionDAO : Manager<UserSessionBE>
    {

        public UserSessionBE GetByUser(Guid guidUserId)
        {
            using (DBContext context = CreateContext())
            {
                var obj = context.UserSession.Where(x => x.UserId == guidUserId).OrderByDescending(x => x.CreatedOn).FirstOrDefault();

                if (obj != null)
                {
                    if (DateTime.Compare(obj.Validity, App.getDate()) > 0)
                        return obj;
                }

                return null;
            }
        }

    }

}
