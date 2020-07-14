using System;

using reingenia.planificador.BusinessEntity.security;

namespace reingenia.planificador.Interface.security
{

    public interface IUserAuthentication
    {
        /*
        UserAuthenticationBE Update(UserAuthenticationBE item);

        bool Delete(Guid id);

        UserAuthenticationBE Get(Guid id);
        */
        UserAuthenticationBE GetByUser(Guid userId);

    }

}
