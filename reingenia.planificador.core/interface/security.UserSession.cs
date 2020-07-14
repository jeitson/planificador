using System;
using System.Collections.Generic;

using reingenia.planificador.BusinessEntity.security;

namespace reingenia.planificador.Interface.security
{

    public interface IUserSession
    {
        /*
        UserSessionBE Create(UserSessionBE item);
        */
        UserSessionBE Update(UserSessionBE item);
        /*
        bool Delete(Guid id);

        UserSessionBE Get(Guid id);

        List<UserSessionBE> List();
        */
        UserSessionBE GetByUser(Guid id);

    }

}
