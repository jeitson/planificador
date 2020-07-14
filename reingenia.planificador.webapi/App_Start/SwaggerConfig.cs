using System;

using MHouseApi;
using Swashbuckle.Application;
using System.Web.Http;
using WebActivatorEx;

[assembly: PreApplicationStartMethod(typeof(SwaggerConfig), "Register")]

namespace MHouseApi
{

    public class SwaggerConfig
    {

        public static void Register()
        {
            var thisAssembly = typeof(SwaggerConfig).Assembly;

            GlobalConfiguration.Configuration
                .EnableSwagger(c =>
                {
                    c.SingleApiVersion("v2", "REINGENIA CS: Planificador de tareas");
                    c.ApiKey("Token").Description("Token").Name("Authorization").In("header");
                    c.IncludeXmlComments(GetXmlCommentsPath());
                })
                .EnableSwaggerUi(c => { c.EnableApiKeySupport("Authorization", "header"); });
        }

        private static string GetXmlCommentsPath()
        {
            return AppDomain.CurrentDomain.BaseDirectory + @"\bin\reingenia.planificador.webapi.xml";
        }

    }

}
