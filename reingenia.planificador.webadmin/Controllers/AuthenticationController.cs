using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web;
using System.Web.Mvc;

using reingenia.planificador.webadmin.Models;

namespace reingenia.planificador.webadmin.Controllers
{

    public class AuthenticationController : CustomController
    {

        #region login

        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            returnUrl = Assess.setString(returnUrl);

            if (this.User.Identity.IsAuthenticated)
                return this.setRedirectAction(returnUrl);

            return this.index(new vmLogin(), returnUrl);
        }
        
        [AllowAnonymous]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(vmLogin model, string returnUrl)
        {
            returnUrl = Assess.setString(returnUrl);

            if (this.setSession(model))
                return this.setRedirectAction(returnUrl);

            return this.index(model, returnUrl);
        }
        
        private ActionResult setRedirectAction(string strReturnURL)
        {
            try
            {
                string strDecodedUrl = "";

                strReturnURL = Assess.setString(strReturnURL);

                if (string.IsNullOrEmpty(strReturnURL) && this.Request.UrlReferrer != null)
                    strReturnURL = this.Server.UrlEncode(this.Request.UrlReferrer.PathAndQuery);

                if (!(string.IsNullOrEmpty(strReturnURL)))
                    strDecodedUrl = this.Server.UrlDecode(strReturnURL);

                if (Url.IsLocalUrl(strReturnURL) && (strReturnURL.Length > 1) && strReturnURL.StartsWith("/") && !(strReturnURL.StartsWith("//")) && !(strReturnURL.StartsWith("/\\")))
                    return this.Redirect(strDecodedUrl);
            }
            catch
            {

            }

            return this.RedirectToAction("Index", Config.getValue("rootcontroller"), new { area = "" });
        }

        private ActionResult index(vmLogin model, string strReturnURL)
        {
            this.setReturnURL(strReturnURL);
            this.setViewBagController();

            return this.View(model);
        }

        private void setReturnURL(string strReturnURL)
        {
            try
            {
                strReturnURL = Assess.setString(strReturnURL);

                if (!(string.IsNullOrEmpty(strReturnURL)) && this.Url.IsLocalUrl(strReturnURL))
                {
                    if (strReturnURL.Equals(Url.Action("Logout", "Auth", new { area = "" })))
                        this.ViewBag.ReturnURL = null;
                    else
                        this.ViewBag.ReturnURL = strReturnURL;
                }
            }
            catch
            {

            }

            this.ViewBag.ReturnURL = null;
        }

        private bool setSession(vmLogin model)
        {
            try
            {
                this.isModelValid();

                model = model.getData();

                dynamic data = null;
                var sc = new StringContent(JsonConvert.SerializeObject(new { username = model.username, password = model.password }), Encoding.UTF8, "application/json");

                using (HttpClient hc = new HttpClient())
                {
                    hc.BaseAddress = new Uri(Config.getValue("webapi"));
                    HttpResponseMessage hrm = hc.PostAsync("api/login", sc).Result;

                    if (hrm.IsSuccessStatusCode)
                        data = JObject.Parse(hrm.Content.ReadAsStringAsync().Result);
                    else
                        throw new Exception("Error Code: " + hrm.StatusCode + "|Message: " + hrm.ReasonPhrase);
                }

                ApplicationUser appUser = new ApplicationUser()
                {
                    Id = Assess.setString((string) data.user.id).ToLower(),
                    UserName = Assess.setString((string) data.user.name),
                    Token = Assess.setString((string) data.token),
                };

                ApplicationSignInManager signInManager = this.HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
                signInManager.SignIn(appUser, isPersistent: model.rememberme, rememberBrowser: false);

                return true;
            }
            catch (Exception ex)
            {
                this.addModelError(ex);
            }

            return false;
        }

        #endregion

        #region cerrar sesion

        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Logout()
        {
            try
            {
                string strURL = "api/logout/" + User.Identity.getId();
                HttpResponseMessage hrm = this.ApiGet(strURL);
            }
            catch
            {
                
            }
            
            IAuthenticationManager authenticationManager = HttpContext.GetOwinContext().Authentication;
            authenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);

            return this.RedirectToAction("Login", "Authentication", new { area = "" });
        }
    
        private HttpResponseMessage ApiGet(string strURL)
        {
            HttpResponseMessage hrm = null;

            try
            {
                using (HttpClient hc = new HttpClient())
                {
                    hc.BaseAddress = new Uri(Config.getValue("webapi"));
                    hc.DefaultRequestHeaders.Accept.Clear();
                    hc.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    hc.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", User.Identity.getToken());
                    
                    hrm = hc.GetAsync(strURL).Result;

                    if (!(hrm.IsSuccessStatusCode))
                        throw new Exception("Error Code: " + hrm.StatusCode + "|Message: " + hrm.ReasonPhrase);
                }
            }
            catch
            {
                throw;
            }

            return hrm;
        }

        #endregion

    }

}
