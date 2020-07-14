using System;
using System.Collections.Generic;
using System.Security.Principal;
using Unity;

using reingenia.planificador.BusinessEntity.security;
using reingenia.planificador.Configuration;
using reingenia.planificador.Interface.security;
using reingenia.planificador.Security;

namespace reingenia.planificador.Application
{
    
    public class ApplicationController
    {

        public IPrincipal SetPrincipal(Guid guidUserId, string strToken)
        {
            var principal = (IPrincipal)ApplicationInstance.GetCache<Principal>(guidUserId.ToString());

            if (principal == null)
            {
                IUserSession objUserSessionBL = ApplicationInstance.ucApplication.Resolve<IUserSession>();
                UserSessionBE session = objUserSessionBL.GetByUser(guidUserId);

                IUser objUserBL = ApplicationInstance.ucApplication.Resolve<IUser>();
                UserBE user = objUserBL.Get(guidUserId);
                /*
                IRole roleModule = ApplicationInstance.Container.Resolve<IRole>();
                List<RoleBE> roles = roleModule.GetByUser(userId);

                IPermission permissionModule = ApplicationInstance.Container.Resolve<IPermission>();
                List<PermissionBE> permissions = permissionModule.GetByUser(userId);
                */
                Session objSession = new Session();
                objSession.Create(user, strToken, Settings.PasswordExpirationTime/*, roles, permissions*/, session);

                return (IPrincipal)ApplicationInstance.GetCache<Principal>(guidUserId.ToString());
            }
            else
                return principal;
        }

    }
    
}
