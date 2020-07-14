using System;
using reingenia.Library;
using reingenia.planificador.BusinessEntity.security;
using reingenia.planificador.Configuration;
using reingenia.planificador.Data.access;
using reingenia.planificador.Interface.security;

namespace reingenia.planificador.BusinessLogic
{
    
    public class UserAuthenticationBL : IUserAuthentication
    {

        internal UserAuthenticationDAO objDAO = null;

        internal UserAuthenticationDAO daoUserAuthentication
        {
            get
            {
                if (objDAO == null)
                    objDAO = new UserAuthenticationDAO();
                
                return objDAO;
            }
        }
        /*
        /// <summary>
        /// La creacion de los datos de autenticacion solo debe hacerse desde
        /// la creación del usuario para que se mantenga la integridad de esos datos.
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        internal UserAuthenticationBE Create(UserAuthenticationBE item)
        {
            return UserAuthenticationDao.Create(item);
        }
        */
        public UserAuthenticationBE Update(UserAuthenticationBE objBE)
        {
            objBE.ModifiedOn = App.getDate();
            objBE.ModifiedById = objBE.UserId;

            return daoUserAuthentication.Update(objBE);
        }
        /*
        public bool Delete(int userId)
        {
            var authentication = GetByUser(userId);

            if (authentication != null)
                UserAuthenticationDao.Delete(authentication);
            
            return true;
        }

        public UserAuthenticationBE Get(int id)
        {
            return UserAuthenticationDao.Find(id);
        }
        */
        public UserAuthenticationBE GetByUser(Guid guidUserId)
        {
            return daoUserAuthentication.GetByUser(guidUserId);
        }
        
        internal void InvalidLogin(UserAuthenticationBE objBE)
        {
            // Generar error de autenticacion
            if (objBE.NumberFailPasswordAttempt.HasValue)
                objBE.NumberFailPasswordAttempt ++;
            else
                objBE.NumberFailPasswordAttempt = 1; // Primer intento fallido

            if (objBE.NumberFailPasswordAttempt >= Settings.NumberFailPasswordAttempt)
            {
                // Bloquear usuario al superar intentos fallidos
                objBE.IsLockedOut = true;
                objBE.LastLockedOutDate = App.getDate();
            }

            this.Update(objBE);

            throw new AuthenticationException(AuthenticationExceptionCode.InvalidUser);
        }
        
        internal void SuccessLogin(UserAuthenticationBE objBE)
        {
            objBE.NumberFailPasswordAttempt = 0;

            this.Update(objBE);
        }
        
    }
    
}
