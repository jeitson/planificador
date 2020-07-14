using System.Web.Mvc;

namespace reingenia.planificador.webadmin.Controllers
{

    public class HomeController : Controller
    {

        [Authorize]
        public ActionResult Index()
        {
            return View();
        }

    }

}
