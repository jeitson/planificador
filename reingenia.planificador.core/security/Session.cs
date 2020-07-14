using System;
using System.Collections.Generic;
using reingenia.Library;
using reingenia.planificador.Application;
using reingenia.planificador.BusinessEntity.security;
using reingenia.planificador.Configuration;
using reingenia.planificador.Data.access;

namespace reingenia.planificador.Security
{

    public class Session
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

        public void Create(UserBE objUserBE, string strToken, int intSessionTimeInMinutes/*, List<RoleBE> roles, List<PermissionBE> permissions*/, UserSessionBE objUserSessionBE = null)
        {
            // crear identidad
            Identity identity = new Identity(objUserBE);

            // crear principal
            Principal principal = new Principal(identity, strToken, intSessionTimeInMinutes/*, roles, permissions*/);

            // crear o actualizar session en DB
            if (objUserSessionBE == null)
            {
                objUserSessionBE = new UserSessionBE();
                objUserSessionBE.Name = objUserBE.Name + ": " + App.getDate().ToString("dd/MM/yyyy HH:mm:ss");
                objUserSessionBE.UserId = objUserBE.Id;
                objUserSessionBE.Token = strToken;
                objUserSessionBE.Validity = App.getDate().AddMinutes(intSessionTimeInMinutes);
                objUserSessionBE.StatusId = Guid.Parse(Settings.StatusActiveId);
                objUserSessionBE.OwnerId = objUserBE.Id;
                objUserSessionBE.CreatedById = objUserBE.Id;
                objUserSessionBE.ModifiedById = objUserBE.Id;

                daoUserSession.Create(objUserSessionBE);
            }
            else
            {
                objUserSessionBE.Validity = App.getDate().AddMinutes(intSessionTimeInMinutes);
                objUserSessionBE.ModifiedOn = App.getDate();
                objUserSessionBE.ModifiedById = objUserBE.Id;

                daoUserSession.Update(objUserSessionBE);
            }

            // guardar session en memoria
            ApplicationInstance.SetCache<Principal>(principal.Identification.Id.ToString(), principal, intSessionTimeInMinutes);
        }

    }

}
