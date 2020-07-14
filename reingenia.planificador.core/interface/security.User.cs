using System;

using reingenia.planificador.BusinessEntity;
using reingenia.planificador.BusinessEntity.security;

namespace reingenia.planificador.Interface.security
{

    public interface IUser
    {

        //User Create(User item, string password);

        //User Update(User user, string password = null);

        //void Delete(Guid id);

        UserBE Get(Guid id);

        //User GetWithoutPermission(int id);

        //User GetByUserName(string userName, int ldapId);

        //ListEntity<UserBE> List(Pagination pagination);

        //ListData<User> ListByRole(int roleId, PaginationInfo pagination);

    }

}
