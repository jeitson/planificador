using Microsoft.Owin;
using Owin;

using reingenia.planificador.webadmin;

[assembly: OwinStartupAttribute(typeof(Startup))]
namespace reingenia.planificador.webadmin
{

    public partial class Startup
    {

        public void Configuration(IAppBuilder app)
        {
            this.ConfigureAuth(app);
        }

    }

}
