using reingenia.planificador.BusinessEntity.security;

namespace reingenia.planificador.Interface
{

    public interface IAuthentication
    {

        UserBE Login(string username, string password);

    }

}
