using System.Web.Mvc;
using System.Web.Routing;

namespace reingenia.planificador.webadmin
{

    public class RouteConfig
    {

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.IgnoreRoute("favicon.ico");

            //routes.MapRoute(
            //    name: "Login",
            //    url: "Login",
            //    defaults: new { controller = "Authentication", action = "Login", id = UrlParameter.Optional }
            //);

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }

    }

}
