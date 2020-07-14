using System;
using System.Collections.Generic;
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

    public class GroupController : ApiController
    {

        private string ErrorPermission = "No tiene suficientes privilegios para realizar la acción {0}";
        private readonly IGroup groupModule;

        public GroupController(IGroup group)
        {
            groupModule = group;
        }

        /// <summary>
        /// Crear grupo
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        [HttpPost]
        [JwtAuthentication]
        [Route("api/group")]
        public HttpResponseMessage Create(GroupInfo item)
        {
            try
            {
                GroupInfo group = groupModule.Create(item);

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
        /// Actualizar grupo
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        [HttpPut]
        [JwtAuthentication]
        [Route("api/group")]
        public HttpResponseMessage Update(GroupInfo item)
        {
            try
            {
                GroupInfo group = groupModule.Update(item);

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
        /// Consultar un grupo
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        [HttpGet]
        [JwtAuthentication]
        [Route("api/group/{groupId}")]
        public HttpResponseMessage Get(int groupId)
        {
            try
            {
                GroupInfo group = groupModule.Get(groupId);

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
        /// Consultar lista de grupos
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [JwtAuthentication]
        [Route("api/group/list")]
        public HttpResponseMessage List()
        {
            try
            {
                List<GroupInfo> groupList = groupModule.List();

                return Request.CreateResponse(HttpStatusCode.OK, groupList);
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
        /// Eliminar un grupo
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        [HttpDelete]
        [JwtAuthentication]
        [Route("api/group/{groupId}")]
        public HttpResponseMessage Delete(int groupId)
        {
            try
            {
                groupModule.Delete(groupId);

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