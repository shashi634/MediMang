using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MediMang.Startup))]
namespace MediMang
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
