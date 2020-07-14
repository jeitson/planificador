using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;
using System;
using System.Web.Helpers;
using System.Security.Claims;

namespace reingenia.planificador.webadmin
{

    public partial class Startup
    {

        public void ConfigureAuth(IAppBuilder app)
        {
            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);
            app.CreatePerOwinContext<ApplicationSignInManager>(ApplicationSignInManager.Create);

            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString(Config.getValue("pathlogin")),
                LogoutPath = new PathString(Config.getValue("pathlogout")),
                ExpireTimeSpan = TimeSpan.FromMinutes(double.Parse(Config.getValue("sessiontime"))),
                CookieName = Config.getValue("sessioncookiee"),
                CookieSecure = CookieSecureOption.SameAsRequest
            });

            AntiForgeryConfig.UniqueClaimTypeIdentifier = ClaimTypes.NameIdentifier;
        }

    }

}
