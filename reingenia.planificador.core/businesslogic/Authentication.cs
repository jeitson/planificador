using reingenia.Library;
using reingenia.planificador.BusinessEntity.security;
using reingenia.planificador.BusinessLogic.security;
using reingenia.planificador.Interface;

namespace reingenia.planificador.BusinessLogic.authentication
{
    
    public class AuthenticationBL : IAuthentication
    {

        private UserBL objUserBL;

        public UserBL blUser
        {
            get
            {
                if (objUserBL == null)
                    objUserBL = new UserBL();
                
                return objUserBL;
            }
        }

        private UserAuthenticationBL objUserAuthenticationBL;

        public UserAuthenticationBL blUserAuthentication
        {
            get
            {
                if (objUserAuthenticationBL == null)
                    objUserAuthenticationBL = new UserAuthenticationBL();
                
                return objUserAuthenticationBL;
            }
        }

        public UserBE Login(string strUserName, string strPassword)
        {
            UserBE objUserBE = blUser.GetByUserName(strUserName);

            if (objUserBE != null && objUserBE.Id.HasValue)
            {
                var objUserAuthenticationBE = blUserAuthentication.GetByUser(objUserBE.Id.Value);

                if (objUserAuthenticationBE != null && objUserAuthenticationBE.IsLockedOut)
                    throw new AuthenticationException(AuthenticationExceptionCode.LockedOutUser);

                if (objUserAuthenticationBE != null && objUserAuthenticationBE.Password == UserBL.GenerateSecurePassword(strPassword, objUserAuthenticationBE.PasswordSalt))
                {
                    blUserAuthentication.SuccessLogin(objUserAuthenticationBE);

                    return objUserBE;
                }
                else
                    blUserAuthentication.InvalidLogin(objUserAuthenticationBE);
            }

            return null;
        }

    }

}
