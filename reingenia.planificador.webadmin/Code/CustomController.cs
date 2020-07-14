using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.ServiceModel;
using System.Web;
using System.Web.Mvc;

//using reingenia.agendacomercial.core;
//using reingenia.agendacomercial.resources;
//using reingenia.agendacomercial.web.Models;
//using reingenia.agendacomercial.web.proxyAG;
//using reingenia.library;

namespace reingenia.planificador.webadmin.Controllers
{

    public abstract class CustomController : Controller
    {
        
        #region variables

        //private mPermiso objPermiso = null;

        private string areaname = string.Empty;

        private string controllername = string.Empty;

        private string actionname = string.Empty;

        //protected internal AgendaComercialClient proxy = null;

        #endregion
        
        #region Viewbag Route Controller

        public void setViewBagController()
        {
            this.setPath();

            this.ViewBag.ActionName = this.actionname;
            this.ViewBag.ControllerName = this.controllername;
            this.ViewBag.AreaName = this.areaname;
        }

        private void setPath()
        {
            this.areaname = "";

            if (System.Web.HttpContext.Current.Request.RequestContext.RouteData.DataTokens["area"] != null)
                this.areaname = System.Web.HttpContext.Current.Request.RequestContext.RouteData.DataTokens["area"].ToString();

            this.controllername = System.Web.HttpContext.Current.Request.RequestContext.RouteData.GetRequiredString("controller");
            this.actionname = System.Web.HttpContext.Current.Request.RequestContext.RouteData.GetRequiredString("action");
        }

        #endregion
        /*
        #region Render Partial View

        protected string RenderPartialViewToString(string strPartialView, object objModel)
        {
            if (string.IsNullOrEmpty(strPartialView))
                strPartialView = ControllerContext.RouteData.GetRequiredString("action");

            this.ViewData.Model = objModel;

            using (StringWriter sw = new StringWriter())
            {
                ViewEngineResult viewResult = ViewEngines.Engines.FindPartialView(ControllerContext, strPartialView);
                ViewContext viewContext = new ViewContext(ControllerContext, viewResult.View, ViewData, TempData, sw);
                viewResult.View.Render(viewContext, sw);

                return sw.GetStringBuilder().ToString();
            }
        }

        #endregion

        #region return to index

        protected RedirectToRouteResult BackToIndex(string strTypeMensaje, string strMensaje)
        {
            TempData["TypeMessage"] = strTypeMensaje;
            TempData["Message"] = strMensaje;

            return this.RedirectToAction("Index");
        }

        #endregion
        */
        #region model error

        protected bool isModelValid()
        {
            string strError = "";

            try
            {
                List<Tuple<string, string>> lstMessages = new List<Tuple<string, string>>();
                var lstErrorModel = ModelState.Values.SelectMany(v => v.Errors);
                string strModelError = "";

                if (lstErrorModel.Count() > 0)
                {
                    foreach (var error in lstErrorModel)
                    {
                        strModelError = Assess.setString(error.ErrorMessage);

                        if (!(string.IsNullOrEmpty(strModelError)))
                            strError += strModelError + "|";

                        if (string.IsNullOrEmpty(strModelError) && error.Exception != null)
                            strError += Assess.setString(error.Exception.Message) + "|";
                    }
                }
            }
            catch (Exception ex)
            {
                strError += Assess.setString(ex.Message) + "|";
            }

            if (!(string.IsNullOrEmpty(strError)))
                throw new Exception(strError);

            return true;
        }
        /*
        protected void addModelError(string strMessageError, string strKey = "")
        {
            ModelState.AddModelError(strKey, strMessageError);
        }
        */
        protected void addModelError(Exception ex, string strKey = "")
        {
            string strMessage = ex.Message;

            if (ex.InnerException != null)
                strMessage = ex.InnerException.Message;

            string[] strErrors = strMessage.Split('|');
            string strValue = "";

            foreach (string strError in strErrors)
            {
                strValue = Assess.setString(strError);

                if (!(string.IsNullOrEmpty(strValue)))
                    this.ModelState.AddModelError(strKey, strValue);
            }
        }
        /*
        protected int getTotalErrors()
        {
            return ModelState.Values.SelectMany(v => v.Errors).Count();
        }
        
        protected string getListError()
        {
            List<Tuple<string, string>> lstMessages = new List<Tuple<string, string>>();
            string strFormat = "<br /> - {0}";
            string strError = "";

            try
            {
                var lstErrorModel = ModelState.Values.SelectMany(v => v.Errors);

                if (lstErrorModel.Count() > 0)
                {
                    foreach (var error in lstErrorModel)
                    {
                        if (clsModel.isNotNull(error.ErrorMessage))
                            strError += string.Format(strFormat, error.ErrorMessage);
                        else if (clsModel.isNotNull(error.Exception))
                            strError += string.Format(strFormat, error.Exception.Message);
                    }
                }
            }
            catch (Exception ex)
            {
                strError += string.Format(strFormat, ex.Message);
            }

            return strError;
        }

        protected void setListModelError()
        {
            List<Tuple<string, string>> lstMessages = new List<Tuple<string, string>>();
            string strFormat = "<br /> - {0}";

            try
            {
                var lstErrorModel = ModelState.Values.SelectMany(v => v.Errors);

                if (lstErrorModel.Count() > 0)
                {
                    string strError = "";

                    foreach (var error in lstErrorModel)
                    {
                        if (clsModel.isNotNull(error.ErrorMessage))
                            strError += string.Format(strFormat, error.ErrorMessage);
                        else if (error.Exception != null)
                            strError += string.Format(strFormat, error.Exception.Message);
                    }

                    if (clsModel.isNotNull(strError))
                        lstMessages.Add(Tuple.Create("0", "Se han encontrado los siguientes errores:" + strError));
                }

                if (TempData["TypeMessage"] != null && TempData["Message"] != null)
                {
                    lstMessages.Add(Tuple.Create(TempData["TypeMessage"].ToString(), TempData["Message"].ToString()));

                    TempData["TypeMessage"] = null;
                    TempData["Message"] = null;
                }
            }
            catch (Exception ex)
            {
                lstMessages.Add(Tuple.Create("0", "Hubo un error al listar los mensajes de error del modelo:" + ex.Message));
            }

            ViewBag.listaMensajes = new SelectList(lstMessages, "Item1", "Item2");
        }
        */
        #endregion        
        /*
        #region permisos de seguridad

        public bool setPermiso(string strActionCustom = "")
        {
            try
            {
                this.setPath();

                if (!(string.IsNullOrEmpty(strActionCustom)))
                {
                    string[] strAction = strActionCustom.Split('|');

                    this.actionname = this.actionname.Replace(strAction[0], strAction[1]);
                }

                Guid? guidUsuario = clsModel.getGuidEx(this.User.Identity.getId(), info.usermodel_usuarioinvalido);

                AgendaComercialClient proxy = new AgendaComercialClient();
                proxy.ClientCredentials.UserName.UserName = this.User.Identity.getToken();

                List<bePermiso> lstBE = proxy.Permiso_ListarPorUsuarioControlador(guidUsuario.Value, this.areaname, this.controllername).ToList();

                clsModel.isNotNullEx(lstBE, string.Format(info.error_permisotipo1, this.areaname + " - " + this.controllername));
                clsModel.isNotEqualEx(lstBE.Count, 0, string.Format(info.error_permisotipo1, this.areaname + " - " + this.controllername));

                bePermiso objBE = lstBE.Where(m => m.accion.Equals(this.actionname) && m.estado.codigo.Equals(kPermiso.ESTADO_Activo)).FirstOrDefault();

                clsModel.isNotNullEx(objBE, info.error_permisotipo2);

                this.objPermiso = new mPermiso(objBE);

                this.ViewBag.PackageIcon = this.objPermiso.packageicon;
                this.ViewBag.PackageName = this.objPermiso.packegename;
                this.ViewBag.OptionIcon = this.objPermiso.optionicon;
                this.ViewBag.OptionName = this.objPermiso.optionname.Replace(" | " + this.objPermiso.nameaction, "");
                this.ViewBag.ActionIcon = this.objPermiso.icon;
                this.ViewBag.ActionName = this.objPermiso.nameaction;
                this.ViewBag.OptionURL = Url.Action("Create", "Home", new { area = "" }).Replace(@"/Home/Create", this.objPermiso.optionurl);
                this.ViewBag.ActionDescription = this.objPermiso.description;
                this.ViewBag.ActionHeader = true;

                return true;
            }
            catch (Exception ex)
            {
                this.addModelError(ex);

                return false;
            }
        }

        public bool isPermisoJson(string strActionCustom = "")
        {
            try
            {
                this.setPath();

                if (!(string.IsNullOrEmpty(strActionCustom)))
                {
                    string[] strAction = strActionCustom.Split('|');

                    this.actionname = this.actionname.Replace(strAction[0], strAction[1]);
                }

                Guid? guidUsuario = clsModel.getGuidEx(this.User.Identity.getId(), info.usermodel_usuarioinvalido);

                AgendaComercialClient proxy = new AgendaComercialClient();
                proxy.ClientCredentials.UserName.UserName = this.User.Identity.getToken();

                List<bePermiso> lstBE = proxy.Permiso_ListarPorUsuarioControlador(guidUsuario.Value, this.areaname, this.controllername).ToList();

                clsModel.isNotNullEx(lstBE, string.Format(info.error_permisotipo1, this.areaname + " - " + this.controllername));
                clsModel.isNotEqualEx(lstBE.Count, 0, string.Format(info.error_permisotipo1, this.areaname + " - " + this.controllername));

                bePermiso objBE = lstBE.Where(m => m.accion.Equals(this.actionname) && m.estado.codigo.Equals(kPermiso.ESTADO_Activo)).FirstOrDefault();

                clsModel.isNotNullEx(objBE, info.error_permisotipo2);

                return true;
            }
            catch (Exception ex)
            {
                this.addModelError(ex);

                return false;
            }
        }

        public RedirectToRouteResult setErrorPermiso()
        {
            TempData["Number"] = 1;
            TempData["Message"] = info.mensaje_permisoerror + this.getListError();

            return this.RedirectToAction("Show", "Error", new { Area = "" });
        }

        public JsonResult getErrorPermiso()
        {
            return this.Json(new { isError = "S", message = info.mensaje_permisoerror + this.getListError() });
        }

        #endregion

        #region configuracion menu and messages

        public void setController(bool isSetMessage = true)
        {
            if (isSetMessage)
                this.setListModelError();
        }

        #endregion
        
        #region paginado

        protected void setPaginate(string strCurrentPage, string strForm, string strRowsAffected = "0", string strPagesAffected = "0")
        {
            ViewBag.CurrentPage = strCurrentPage;
            ViewBag.FormPaginate = strForm;
            ViewBag.RowsAffected = strRowsAffected;
            ViewBag.PagesAffected = strPagesAffected;
        }

        #endregion

        #region archivos

        protected bool saveImageFile(HttpPostedFileWrapper httpFile, string strDirectorio, string strFileName)
        {
            try
            {
                if (httpFile != null)
                {
                    string strPath = string.Format("{0}{1}", this.setPathServer(strDirectorio), strFileName);
                    string strServerPath = this.Server.MapPath(strPath);

                    httpFile.SaveAs(strServerPath);

                    return true;
                }

                return false;
            }
            catch
            {
                return false;
            }
        }

        protected bool saveImageFile(HttpPostedFileWrapper httpFile, string strDirectorio, ref string strFileName, int? intWidth = null, int? intHeight = null)
        {
            try
            {
                if (httpFile != null)
                {
                    string strPath = this.setPathServer(strDirectorio);
                    string strNewFile = strPath;

                    strPath += strFileName + Path.GetExtension(httpFile.FileName).ToLower();

                    if (intHeight.HasValue && intWidth.HasValue)
                        strNewFile += "small_" + strFileName + Path.GetExtension(httpFile.FileName).ToLower();

                    string strServerPath = this.Server.MapPath(strPath);

                    httpFile.SaveAs(strServerPath);

                    if (intHeight.HasValue && intWidth.HasValue)
                        this.setSaveResizedImage(strServerPath, this.Server.MapPath(strNewFile), intWidth.Value, intHeight.Value);

                    strFileName = Path.GetFileName(strPath);

                    return true;
                }

                return false;
            }
            catch
            {
                return false;
            }
        }

        private string setPathServer(string strDirectorio)
        {
            string strPath = clsConfig.getValue("pathFilesUpdload") + strDirectorio + @"/";
            string strServerPath = Server.MapPath(strPath);

            if (!(Directory.Exists(strServerPath)))
                Directory.CreateDirectory(strServerPath);

            return strPath;
        }

        private bool setSaveResizedImage(string strPath, string strNewFile, int intWidth, int intHeight)
        {
            MemoryStream mStream = new MemoryStream();

            try
            {
                using (Bitmap bmSource = new Bitmap(strPath))
                {
                    double dblY = bmSource.Height;
                    double dblX = bmSource.Width;
                    double dblFactor = 1;

                    if (intWidth > 0)
                        dblFactor = intWidth / dblX;
                    else if (intHeight > 0)
                        dblFactor = intHeight / dblY;

                    using (Bitmap bmImage = new Bitmap((int)(dblX * dblFactor), (int)(dblY * dblFactor)))
                    {
                        // Set DPI of image (xDpi, yDpi)
                        bmImage.SetResolution(72, 72);

                        Graphics gImage = Graphics.FromImage(bmImage);

                        gImage.Clear(Color.White);
                        gImage.DrawImage(bmSource, new Rectangle(0, 0, (int)(dblFactor * dblX), (int)(dblFactor * dblY)), new Rectangle(0, 0, (int)dblX, (int)dblY), GraphicsUnit.Pixel);

                        bmImage.Save(strNewFile, this.getImageFormat(strPath));
                    }
                }

                return true;
            }
            catch
            {

            }

            return false;
        }

        private ImageFormat getImageFormat(String strPath)
        {
            switch (Path.GetExtension(strPath))
            {
                case ".bmp":
                    return ImageFormat.Bmp;
                case ".gif":
                    return ImageFormat.Gif;
                case ".jpg":
                    return ImageFormat.Jpeg;
                case ".png":
                    return ImageFormat.Png;
                default:
                    break;
            }

            return ImageFormat.Jpeg;
        }

        protected bool deleteFiles(string strDirectorio, string strId)
        {
            try
            {
                string strPath = Request.MapPath(clsConfig.getValue("pathFilesUpdload") + strDirectorio + @"/");

                IEnumerable<string> lstFiles = Directory.EnumerateFiles(strPath, "*" + strId + "*.*").Select(p => Path.GetFileName(p));

                foreach (string strFile in lstFiles)
                {
                    try
                    {
                        System.IO.File.Delete(strPath + strFile);
                    }
                    catch
                    {

                    }
                }

                return true;
            }
            catch
            {
                return false;
            }
        }
        
        #endregion

        #region proxy

        protected void proxyOpen()
        {
            this.proxy = new AgendaComercialClient();
            proxy.ClientCredentials.UserName.UserName = this.User.Identity.getToken();
        }

        protected void proxyClose()
        {
            if (this.proxy != null)
            {
                if (this.proxy.State.Equals(CommunicationState.Opened))
                    this.proxy.Close();
            }
                
            this.proxy = null;
        }

        #endregion
        */
    }

}
