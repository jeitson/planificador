using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;

//using reingenia.agendacomercial.core;
//using reingenia.agendacomercial.resources;
//using reingenia.agendacomercial.web.Models;
//using reingenia.agendacomercial.web.proxyAG;
//using reingenia.library;

namespace reingenia.planificador.webadmin
{

    public class ApplicationUser : IUser<string>
    {

        #region propiedades

        public string Id { get; set; }

        public string UserName { get; set; }

        public string Token { get; set; }

        //public string Image { get; set; }

        //public string Roles { get; set; }

        //public string AsesorId { get; set; }

        //public string UnidadComercialId { get; set; }

        #endregion

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager)
        {
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);

            userIdentity.AddClaim(new Claim("Id", this.Id));
            //userIdentity.AddClaim(new Claim("Token", this.Token));
            //userIdentity.AddClaim(new Claim("Image", this.Image));
            //userIdentity.AddClaim(new Claim("Roles", this.Roles));
            //userIdentity.AddClaim(new Claim("AsesorId", this.AsesorId));
            //userIdentity.AddClaim(new Claim("UnidadComercialId", this.UnidadComercialId));

            return userIdentity;
        }

    }

    public static class IdentityExtensions
    {

        public static string getId(this IIdentity identity)
        {
            var claim = ((ClaimsIdentity)identity).FindFirst("Id");

            return (claim != null) ? claim.Value : string.Empty;
        }

        public static string getToken(this IIdentity identity)
        {
            var claim = ((ClaimsIdentity)identity).FindFirst("Token");

            return (claim != null) ? claim.Value : string.Empty;
        }
        /*
        public static string getImage(this IIdentity identity)
        {
            var claim = ((ClaimsIdentity)identity).FindFirst("Image");

            return (claim != null) ? claim.Value : string.Empty;
        }

        public static string getRoles(this IIdentity identity)
        {
            var claim = ((ClaimsIdentity)identity).FindFirst("Roles");

            return (claim != null) ? claim.Value : string.Empty;
        }

        public static string getAsesorId(this IIdentity identity)
        {
            var claim = ((ClaimsIdentity)identity).FindFirst("AsesorId");

            return (claim != null) ? claim.Value : string.Empty;
        }

        public static string getUnidadComercialId(this IIdentity identity)
        {
            var claim = ((ClaimsIdentity)identity).FindFirst("UnidadComercialId");

            return (claim != null) ? claim.Value : string.Empty;
        }
        */
    }

    public class ApplicationUserStore : IUserStore<ApplicationUser>
    {

        public void Dispose()
        {

        }
        
        public Task CreateAsync(ApplicationUser user)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(ApplicationUser user)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(ApplicationUser user)
        {
            throw new NotImplementedException();
        }
        
        public async Task<ApplicationUser> FindByIdAsync(string userId)
        {
            throw new NotImplementedException();
        }

        public async Task<ApplicationUser> FindByNameAsync(string userName)
        {
            throw new NotImplementedException();
        }
        
    }

    public class ApplicationUserManager : UserManager<ApplicationUser>
    {

        public ApplicationUserManager(IUserStore<ApplicationUser> store) : base(store)
        {

        }

        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            var manager = new ApplicationUserManager(new ApplicationUserStore());

            return manager;
        }

    }

    public class ApplicationSignInManager : SignInManager<ApplicationUser, string>
    {

        public ApplicationSignInManager(ApplicationUserManager userManager, IAuthenticationManager authenticationManager) : base(userManager, authenticationManager)
        {

        }

        public override Task<ClaimsIdentity> CreateUserIdentityAsync(ApplicationUser user)
        {
            return user.GenerateUserIdentityAsync((ApplicationUserManager) UserManager);
        }

        public static ApplicationSignInManager Create(IdentityFactoryOptions<ApplicationSignInManager> options, IOwinContext context)
        {
            return new ApplicationSignInManager(context.GetUserManager<ApplicationUserManager>(), context.Authentication);
        }

    }
    /*
    public class ApplicationUserAuthorized
    {
        
        public static List<mSystemOptions> getSystemOptions(string strUserId, string strToken, string strAreaName, string strControllerName)
        {
            List<mSystemOptions> lstMenu = new List<mSystemOptions>();

            try
            {
                Guid? guidUsuario = clsModel.getGuidEx(strUserId, info.usermodel_usuarioinvalido);

                AgendaComercialClient proxy = new AgendaComercialClient();
                proxy.ClientCredentials.UserName.UserName = strToken;

                List<beMenu> lstBE = proxy.Menu_ListarPorUsuario(guidUsuario.Value).ToList();

                proxy.Close();

                if (lstBE.Count > 0)
                {
                    lstBE = lstBE.Where(m => m.estado.codigo.Equals(kMenu.ESTADO_Activo)).ToList();
                    List<beMenu> lstRaiz = lstBE.Where(o => !(o.nivelsuperior.id.HasValue)).ToList();

                    foreach (beMenu objBE in lstRaiz)
                    {
                        mSystemOptions objPadre = new mSystemOptions()
                            {
                                name = objBE.nombre,
                                description = clsModel.setString(objBE.descripcion),
                                icon = clsModel.setString(objBE.icono),
                                isactive = false
                            };

                        List<beMenu> lstItems = lstBE.Where(o => o.nivelsuperior.id.HasValue && o.nivelsuperior.id.Equals(objBE.id)).ToList();

                        foreach (beMenu objItem in lstItems)
                            objPadre.lstItems.Add(new mSystemOptionsItem()
                                {
                                    actionname = clsModel.setString(objItem.permiso.accion),
                                    controllername = clsModel.setString(objItem.permiso.controlador),
                                    areaname = clsModel.setString(objItem.permiso.area),
                                    name = clsModel.setString(objItem.nombre),
                                    url = clsModel.setString(objItem.url),
                                    disable = true,
                                    hasaccess = true
                                }
                            );

                        lstMenu.Add(objPadre);
                    }

                    if (string.IsNullOrEmpty(strAreaName))
                        strAreaName = kMenu.PanelPrincipal;

                    mSystemOptions objSO = lstMenu.Where(o => o.name.Equals(clsModel.setString(strAreaName))).FirstOrDefault();

                    if (objSO != null)
                    {
                        objSO.isactive = true;

                        if (!(string.IsNullOrEmpty(clsModel.getString(strControllerName))))
                        {
                            mSystemOptionsItem objItemSO = objSO.lstItems.Where(o => o.name.Equals(strControllerName)).FirstOrDefault();

                            if (objItemSO != null)
                                objItemSO.disable = false;
                        }
                    }

                    return lstMenu;
                }
            }
            catch
            {

            }

            return lstMenu;
        }

        public static List<bePermiso> getAuthorizedList(string strUserId, string strToken, string strArea, string strController)
        {
            List<bePermiso> lstBE = new List<bePermiso>();

            try
            {
                Guid? guidUsuario = clsModel.getGuidEx(strUserId, info.usermodel_usuarioinvalido);

                AgendaComercialClient proxy = new AgendaComercialClient();
                proxy.ClientCredentials.UserName.UserName = strToken;

                lstBE = proxy.Permiso_ListarPorUsuarioControlador(guidUsuario.Value, strArea, strController).ToList();

                proxy.Close();
            }
            catch
            {

            }

            return lstBE;
        }

        public static bool isAuthorized(string strUserId, string strToken, string strArea, string strController, string strAction)
        {
            try
            {
                Guid? guidUsuario = clsModel.getGuidEx(strUserId, info.usermodel_usuarioinvalido);

                AgendaComercialClient proxy = new AgendaComercialClient();
                proxy.ClientCredentials.UserName.UserName = strToken;

                List<bePermiso> lstBE = proxy.Permiso_ListarPorUsuarioControlador(guidUsuario.Value, strArea, strController).ToList();

                proxy.Close();

                clsModel.isNotNullEx(lstBE, string.Format(info.error_permisotipo1, strArea + " - " + strController));
                clsModel.isNotEqualEx(lstBE.Count, 0, string.Format(info.error_permisotipo1, strArea + " - " + strController));

                bePermiso objBE = lstBE.Where(m => m.accion.Equals(strAction) && m.estado.codigo.Equals(kPermiso.ESTADO_Activo)).FirstOrDefault();

                return clsModel.isNotNullEx(objBE, info.error_permisotipo2);
            }
            catch
            {
                return false;
            }
        }

        public static bool isRol(string strRolUser, string strRol)
        {
            try
            {
                if (string.IsNullOrEmpty(strRolUser))
                    return false;

                if (string.IsNullOrEmpty(strRol))
                    return false;

                List<beReference> lstBE = ((beReference[])clsConvert.deserializeFromString(strRolUser)).ToList();

                return lstBE.Any(m => m.codigo.Equals(strRol));
            }
            catch
            {
                return false;
            }
        }
        
    }
    */
}
