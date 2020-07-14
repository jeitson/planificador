using System;
using System.Net;
using System.Net.Http;
using System.Security;
using System.Web.Http;
/*
using reingenia.planificador.entity;
using reingenia.planificador.@interface;
using reingenia.planificador.webapi.Security;
using reingenia.utility;

namespace reingenia.API.Controllers
{

    public class UserController : ApiController
    {

        private string ErrorPermission = "No tiene suficientes privilegios para realizar la acción {0}";
        private readonly IUser userModule;

        public UserController(IUser user)
        {
            userModule = user;
        }

        /// <summary>
        /// Crear usuario
        /// </summary>
        /// <param name="item"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        [HttpPost]
        [JwtAuthentication]
        [Route("api/user")]
        public HttpResponseMessage Create(UserInfo item, string password)
        {
            try
            {
                UserInfo user = userModule.Create(item, password);

                return Request.CreateResponse(HttpStatusCode.OK, user);
            }
            catch (SecurityException ex)
            {
                ExceptionHandler.HandleException(ex, PolicyType.Api);

                return LaunchSecurityException("Crear Usuarios");
            }
            catch (Exception ex)
            {
                ExceptionHandler.HandleException(ex, PolicyType.Api);

                return Request.CreateResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
        }

        /// <summary>
        /// Actualizar usuario
        /// </summary>
        /// <param name="item"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        [HttpPut]
        [JwtAuthentication]
        [Route("api/user")]
        public HttpResponseMessage Update(UserInfo item, string password = null)
        {
            try
            {
                UserInfo user = userModule.Update(item, password);

                return Request.CreateResponse(HttpStatusCode.OK, user);
            }
            catch (SecurityException ex)
            {
                ExceptionHandler.HandleException(ex, PolicyType.Api);

                return LaunchSecurityException("Actualizar Usuarios");
            }
            catch (Exception ex)
            {
                ExceptionHandler.HandleException(ex, PolicyType.Api);

                return Request.CreateResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
        }

        /// <summary>
        /// Consultar usuario
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpGet]
        [JwtAuthentication]
        [Route("api/user/{userId}")]
        public HttpResponseMessage Get(int userId)
        {
            try
            {
                UserInfo user = userModule.Get(userId);

                return Request.CreateResponse(HttpStatusCode.OK, user);
            }
            catch (SecurityException ex)
            {
                ExceptionHandler.HandleException(ex, PolicyType.Api);

                return LaunchSecurityException("Consultar Usuarios");
            }
            catch (Exception ex)
            {
                ExceptionHandler.HandleException(ex, PolicyType.Api);

                return Request.CreateResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
        }

        /// <summary>
        /// Listado de usuarios paginado
        /// </summary>
        /// <param name="pagination"></param>
        /// <returns></returns>
        [HttpPost]
        [JwtAuthentication]
        [Route("api/user/list")]
        public HttpResponseMessage List(PaginationInfo pagination)
        {
            try
            {
                ListDataInfo<UserInfo> userList = userModule.List(pagination);

                return Request.CreateResponse(HttpStatusCode.OK, userList);
            }
            catch (SecurityException ex)
            {
                ExceptionHandler.HandleException(ex, PolicyType.Api);

                return LaunchSecurityException("Listar Usuarios");
            }
            catch (Exception ex)
            {
                ExceptionHandler.HandleException(ex, PolicyType.Api);

                return Request.CreateResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
        }

        /// <summary>
        /// Eliminar usuario
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpDelete]
        [JwtAuthentication]
        [Route("api/user/{userId}")]
        public HttpResponseMessage Delete(int userId)
        {
            try
            {
                userModule.Delete(userId);

                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (SecurityException ex)
            {
                ExceptionHandler.HandleException(ex, PolicyType.Api);

                return LaunchSecurityException("Eliminar Usuarios");
            }
            catch (Exception ex)
            {
                ExceptionHandler.HandleException(ex, PolicyType.Api);

                return Request.CreateResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
        }

        internal HttpResponseMessage LaunchSecurityException(string action)
        {
            return Request.CreateResponse(HttpStatusCode.InternalServerError, string.Format(ErrorPermission, action));
        }

    }

}
*/