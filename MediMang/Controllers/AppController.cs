using System.Web.Mvc;

namespace MediMang.Controllers
{
    public class AppController : Controller
    {
        // GET: App
        public ActionResult Index()
        {
            return View();
        }
    }
}