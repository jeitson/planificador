using System.Web;
using System.Web.Mvc;

namespace reingenia.planificador.webadmin
{

    public class CustomActionFilterAttribute : ActionFilterAttribute
    {

        public override void OnResultExecuting(ResultExecutingContext filterContext)
        {
            filterContext.Controller.ViewBag.Autor = HttpUtility.HtmlDecode("REINGENIA Global Solutions");
        }

    }

}
