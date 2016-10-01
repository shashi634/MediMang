using System.Web.Mvc;
using System.Web.Routing;

namespace MediMang
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.IgnoreRoute("Static/{*pathInfo}");
            // this serves up the default route so that UI-Router can do the rest
            routes.MapRoute("MediMangBase", "MediMang/{*pathInfo}",
                new { controller = "App", action = "Index", id = UrlParameter.Optional }
                );
            routes.MapRoute(
                "Default",
                "{controller}/{action}/{id}",
                new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                new[] { "MediMang.Controllers" }
            );
        }
    }
}
