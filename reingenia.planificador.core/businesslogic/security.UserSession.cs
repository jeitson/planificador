using System;
using System.Collections.Generic;
using reingenia.Library;
using reingenia.planificador.BusinessEntity.security;
using reingenia.planificador.Data.access;
using reingenia.planificador.Interface.security;

namespace reingenia.planificador.BusinessLogic.security
{
    
    public class UserSessionBL : IUserSession
    {

        internal UserSessionDAO objDAO = null;

        internal UserSessionDAO daoUserSession
        {
            get
            {
                if (objDAO == null)
                    objDAO = new UserSessionDAO();
                
                return objDAO;
            }
        }
        /*
        public UserSessionInfo Create(UserSessionInfo item)
        {
            return UserSessionDao.Create(item);
        }
        */
        public UserSessionBE Update(UserSessionBE objBE)
        {
            objBE.ModifiedOn = App.getDate();
            objBE.ModifiedById = objBE.UserId;

            return daoUserSession.Update(objBE);
        }
        /*
        public bool Delete(int id)
        {
            UserSessionDao.Delete(new UserSessionInfo() { Id = id });

            return true;
        }

        public UserSessionInfo Get(int id)
        {
            return UserSessionDao.Find(id);
        }

        public List<UserSessionInfo> List()
        {
            return UserSessionDao.List();
        }
        */
        public UserSessionBE GetByUser(Guid guidUserId)
        {
            return daoUserSession.GetByUser(guidUserId);
        }

    }
    
}
