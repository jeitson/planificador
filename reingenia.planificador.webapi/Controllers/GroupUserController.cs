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

    public class GroupUserController : ApiController
    {

        private string ErrorPermission = "No tiene suficientes privilegios para realizar la acción {0}";
        private readonly IGroupUser groupUserModule;

        public GroupUserController(IGroupUser group)
        {
            groupUserModule = group;
        }

        /// <summary>
        /// Agrega un usuario a un grupo
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [JwtAuthentication]
        [Route("api/group/{groupId}/user/{userId}")]
        public HttpResponseMessage Create(int groupId, int userId)
        {
            try
            {
                GroupUserInfo item = new GroupUserInfo() { GroupId = groupId, UserId = userId };
                GroupUserInfo group = groupUserModule.Create(item);

                return Request.CreateResponse(HttpStatusCode.OK, group);
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
        /// Eliminar un usuario de un grupo
        /// </summary>
        /// <param name="groupId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpDelete]
        [JwtAuthentication]
        [Route("api/group/{groupId}/user/{userId}")]
        public HttpResponseMessage Delete(int groupId, int userId)
        {
            try
            {
                groupUserModule.Delete(groupId, userId);

                return Request.CreateResponse(HttpStatusCode.OK, true);
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

        internal HttpResponseMessage LaunchSecurityException(string action)
        {
            return Request.CreateResponse(HttpStatusCode.InternalServerError, string.Format(ErrorPermission, action));
        }

    }

}
*/