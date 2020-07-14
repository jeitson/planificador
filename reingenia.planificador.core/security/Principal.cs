using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading;
/*
using reingenia.planificador.Configuration;
using reingenia.planificador.BusinessEntity.security;
using reingenia.planificador.BusinessEntity.log;
using reingenia.planificador.Data.access.log;
using reingenia.Library;
*/
namespace reingenia.planificador.Security
{

    public class Principal : IPrincipal
    {

        /// <summary>
        /// Retorna la entidad de seguridad actual
        /// </summary>
        public static Principal Current
        {
            get { return Thread.CurrentPrincipal as Principal; }

            internal set
            {
                if (value != null)
                {
                    Thread.CurrentPrincipal = value;
                    Thread.CurrentThread.CurrentCulture = value.Identification.Culture;
                    Thread.CurrentThread.CurrentUICulture = Thread.CurrentThread.CurrentCulture;
                }
            }
        }

        internal Principal(Identity identity, string token, int sessionTime/*, List<RoleBE> roles, List<PermissionBE> permissions = null*/)
        {
            this.Identification = identity;
            this.Token = token;
            this.Expiration = DateTime.Now.AddMinutes(sessionTime);
            //this.Permissions = permissions;
            //this.Roles = roles;
        }

        /// <summary>
        /// Identidad del usuario
        /// </summary>
        public Identity Identification { get; private set; }

        /// <summary>
        /// fecha de expiración de la session para un usuario
        /// </summary>
        public DateTime Expiration { get; internal set; }
        /*
        /// <summary>
        /// Lista de grupos del usuario
        /// </summary>
        //public List<GroupInfo> Groups { get; private set; }

        /// <summary>
        /// Lista de roles del usuario
        /// </summary>
        public List<RoleBE> Roles { get; internal set; }

        /// <summary>
        /// Lista de permisos del usuario
        /// </summary>
        public List<PermissionBE> Permissions { get; internal set; }

        /// <summary>
        /// Identificador del tenant
        /// </summary>
        public int TenantId { get; private set; }
        */
        /// <summary>
        /// Token identificador de la session
        /// </summary>
        public string Token { get; private set; }

        public IIdentity Identity
        {
            get { return Identification; }
        }
        
        public bool IsInRole(string role)
        {
            /*string[] checkList = role.Split(new[] { ',', ' ' }, StringSplitOptions.RemoveEmptyEntries);
            bool result = false;
            int index = 0;

            List<string> AuthorizationPermissions = GetAuthorizationData();

            if (AuthorizationPermissions != null && AuthorizationPermissions.Count > 0)
            {
                if (AuthorizationPermissions.Count > 0)
                {
                    while (index < checkList.Length && !result)
                    {
                        string permission = AuthorizationPermissions.Find(p => p.Trim().Equals(checkList[index], StringComparison.InvariantCultureIgnoreCase));

                        result = permission != null;

                        if (result)
                            Audit(permission);
                        else
                            index++;
                    }
                }
            }
            
            return result;*/
            return true;
        }
        /*
        private List<string> GetAuthorizationData()
        {
            if (Settings.AuthorizationBY == "role")
                return this.Roles.Select(x => x.Name).ToList();

            if (Settings.AuthorizationBY == "permission")
                return this.Permissions.Select(x => x.Name).ToList();

            return null;
        }
        *//*
        private void Audit(string permission)
        {
            try
            {
                //AuditBE audit = null;
                AuditBE audit = new AuditBE();
                
                if (Settings.AuthorizationBY == "role")
                {
                    var roleObj = this.Roles.FirstOrDefault(x => x.Name == permission);

                    audit = new AuditBE() { PermissionId = roleObj.Id };
                }

                if (Settings.AuthorizationBY == "permission")
                {
                    var permissionObj = this.Permissions.FirstOrDefault(x => x.Name == permission);

                    if (permissionObj.IsAudit)
                        audit = new AuditInfo() { PermissionId = permissionObj.Id };
                }
                
                audit.UserId = this.Identification.Id;
                audit.CreatedOn = DateTime.Now;

                AuditDAO auditModule = new AuditDAO();

                auditModule.Create(audit);
            }
            catch (Exception ex)
            {
                ExceptionHandler.HandleException(ex, PolicyType.Application);
            }
        }
        */
    }

}
