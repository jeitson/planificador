using System.Web.Http;
using System.Web.Http.Cors;

using reingenia.planificador.webapi.Models;
using reingenia.planificador.Application;

namespace MHouseApi
{

    public static class WebApiConfig
    {

        public static void Register(HttpConfiguration config)
        {
            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);

            ApplicationInstance.Start();

            // Web API configuration and services
            config.DependencyResolver = new UnityResolver(ApplicationInstance.ucApplication);

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }

    }

}
