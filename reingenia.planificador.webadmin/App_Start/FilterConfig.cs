using System.Web.Mvc;

namespace reingenia.planificador.webadmin
{

    public class FilterConfig
    {

        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }

    }

}
