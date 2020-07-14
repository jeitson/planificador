using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Unity;

using reingenia.Library;
using reingenia.planificador.Application;
using reingenia.planificador.BusinessEntity.security;
using reingenia.planificador.DTO;
using reingenia.planificador.Interface;
using reingenia.planificador.Interface.security;
using reingenia.planificador.webapi.Security;
using reingenia.planificador.Security;

namespace reingenia.planificador.webapi.Controllers
{

    public class AuthenticationController : ApiController
    {

        private readonly IUserSession objUserSessionBL;

        private const string messageAuthenticationError = "No existen datos a validar";
        private const string messageUserNameError = "No se puede validar el nombre del usuario";
        private const string messagePasswordError = "No se puede validar la contraseña";
        private const string messageLoginError = "Los datos de inicio de sesion no son correctos";
        //private string ErrorPermission = "No tiene suficientes privilegios para realizar la acción {0}";
        
        public AuthenticationController()
        {
            
        }

        public AuthenticationController(IUserSession objUserSessionBL)
        {
            this.objUserSessionBL = objUserSessionBL;
        }
        
        /// <summary>
        /// Autenticar usuario
        /// </summary>
        /// <param name="authentication">objeto de autenticación</param>
        /// <returns>Información del usuario</returns>
        [HttpPost]
        [Route("api/login")]
        public HttpResponseMessage Authentication(AuthenticationDTO authentication)
        {
            try
            {
                AuthenticationValidation(authentication);

                IAuthentication blAuthentication = ApplicationInstance.ucApplication.Resolve<IAuthentication>();
                UserBE objUserBE = blAuthentication.Login(authentication.username, authentication.password);

                if (objUserBE != null)
                {
                    // crear token
                    string strToken = JwtAuthManager.GenerateJWTToken(Convert.ToString(objUserBE.Id));

                    // establecer la cache de la session, permisos, roles, tiempo de session
                    new ApplicationController().SetPrincipal(objUserBE.Id.Value, strToken);

                    return Request.CreateResponse(HttpStatusCode.OK, new { token = strToken, user = new { id = objUserBE.Id.ToString(), name = objUserBE.Name } });
                }
                else
                    throw new ArgumentException(messageLoginError);
            }
            catch (Exception ex)
            {
                ExceptionHandler.HandleException(ex, PolicyType.Api);

                return Request.CreateResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
        }

        /// <summary>
        /// Cerrar session
        /// </summary>
        /// <param name="userId">id del usuario</param>
        [HttpGet]
        [JwtAuthentication]
        [Route("api/logout/{userId}")]
        public bool Close(string userId)
        {
            bool flag = false;
            UserSessionBE objBE = objUserSessionBL.GetByUser(Guid.Parse(userId));

            if (objBE != null)
            {
                objBE.Validity = App.getDate();

                this.objUserSessionBL.Update(objBE);

                ApplicationInstance.DeleteCache<Principal>(Convert.ToString(objBE.UserId.Value));

                flag = true;
            }

            return flag;
        }
        
        private static void AuthenticationValidation(AuthenticationDTO objAuthentication)
        {
            if (objAuthentication == null)
                throw new ArgumentException(messageAuthenticationError);

            if (string.IsNullOrEmpty(objAuthentication.username))
                throw new ArgumentException(messageUserNameError);

            if (string.IsNullOrEmpty(objAuthentication.password))
                throw new ArgumentException(messagePasswordError);
        }
        /*
        internal HttpResponseMessage LaunchSecurityException(string action)
        {
            return Request.CreateResponse(HttpStatusCode.InternalServerError, string.Format(ErrorPermission, action));
        }
        */
    }

}
