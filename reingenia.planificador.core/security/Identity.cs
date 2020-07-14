using System;
using System.Globalization;
using System.Security.Principal;
using System.Threading;

using reingenia.planificador.BusinessEntity.security;

namespace reingenia.planificador.Security
{

    public class Identity : IIdentity
    {

        public Identity(UserBE objUserBE)
        {
            IsAuthenticated = objUserBE != null;

            if (objUserBE != null)
            {
                Culture = Thread.CurrentThread.CurrentCulture;
                CultureName = Thread.CurrentThread.CurrentUICulture.Name;
                eMail = objUserBE.eMail;
                FullName = objUserBE.Name;
                Id = objUserBE.Id;
                IsAuthenticated = true;
                Name = objUserBE.Name;
            }
        }

        /// <summary>
        /// Retorna la identidad actual
        /// </summary>
        public static Identity Current
        {
            get { return Thread.CurrentPrincipal.Identity as Identity; }
        }

        /// <summary>
        /// Obtiene el tipo de autenticación utilizado.
        /// </summary>
        public string AuthenticationType { get; private set; }

        /// <summary>
        /// Configuración regional
        /// </summary>
        public CultureInfo Culture { get; internal set; }

        /// <summary>
        /// Idioma del usuario
        /// </summary>
        public string CultureName { get; set; }

        /// <summary>
        /// Correo electrónico
        /// </summary>
        public string eMail { get; set; }

        /// <summary>
        /// Nombre del usuario actual
        /// </summary>
        public string FullName { get; set; }

        /// <summary>
        /// Identificador del usuario
        /// </summary>
        public Guid? Id { get; private set; }

        /// <summary>
        /// Obtiene un valor que indica si el usuario se ha autenticado.
        /// </summary>
        public bool IsAuthenticated { get; private set; }

        /// <summary>
        /// Nombre de conexión del usuario
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Zona geográfica del usuario
        /// </summary>
        public TimeZoneInfo TimeZone { get; internal set; }

        /// <summary>
        /// Zona geográfica del usuario
        /// </summary>
        public string Zone { get; set; }

    }

}
