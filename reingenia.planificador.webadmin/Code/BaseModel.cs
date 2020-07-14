using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;

namespace reingenia.planificador.webadmin.Models
{

    [Serializable()]
    public abstract partial class BaseModel : IDisposable
    {

        #region variables

        private bool isDisposed = false;

        #endregion

        #region new

        public BaseModel()
        {

        }

        #endregion

        #region funciones
        /*
        public bool isFile(HttpPostedFileWrapper httpFile)
        {
            if (httpFile != null)
            {
                if (httpFile.ContentLength > 0)
                    return true;
            }

            return false;
        }

        public bool isImage(HttpPostedFileWrapper httpFile)
        {
            if (httpFile.ContentType.Contains("image"))
            {
                string[] arrFormat = new string[] { ".jpg", ".png", ".gif", ".jpeg" };

                if (arrFormat.Any(item => httpFile.FileName.EndsWith(item, StringComparison.OrdinalIgnoreCase)))
                {
                    using (var img = Image.FromStream(httpFile.InputStream))
                    {
                        List<ImageFormat> lstFormats = new List<ImageFormat>();
                        lstFormats.Add(ImageFormat.Png);
                        lstFormats.Add(ImageFormat.Jpeg);
                        lstFormats.Add(ImageFormat.Gif);

                        foreach (ImageFormat format in lstFormats)
                        {
                            if (img.RawFormat.Equals(format))                            
                                return true;
                        }
                    }
                }

                return false;
            }

            return false;
        }

        public bool isFileSize(HttpPostedFileWrapper httpFile, int intMaxSize)
        {
            return (!(httpFile.ContentLength > (1 * 1024 * intMaxSize)));
        }

        public DateTime getFileDate(HttpPostedFileWrapper httpFile)
        {
            return DateTime.Now;
        }

        public string getFileExtension(HttpPostedFileWrapper httpFile)
        {
            return Path.GetExtension(httpFile.FileName);
        }
        */
        #endregion

        #region dispose

        protected virtual void Dispose(bool isDisposing)
        {
            try
            {
                if (!(this.isDisposed))
                {
                    if (isDisposing)
                        this.disposeManagedResources();

                    this.disposeUnmanagedResources();
                }
            }
            finally
            {
                this.isDisposed = true;
            }
        }

        ~BaseModel()
        {
            this.Dispose(false);
        }

        public void Dispose()
        {
            this.Dispose(true);

            GC.SuppressFinalize(this);
        }
        
        public void setNull(List<BaseModel> lstBase)
        {
            if (lstBase != null)
            {
                if (lstBase.Count > 0)
                {
                    foreach (BaseModel objBase in lstBase)
                        objBase.Dispose();

                    lstBase.Clear();
                }

                lstBase = null;
            }
        }
        
        protected virtual void disposeManagedResources()
        {

        }

        protected virtual void disposeUnmanagedResources()
        {

        }

        #endregion

    }
    /*
    public class BaseSearch : IDisposable
    {

        #region variables

        private bool isDisposed = false;

        #endregion

        #region atributos

        public string pagina { get; set; }

        public string tipoorden { get; set; }

        public string columnaorden { get; set; }

        #endregion

        #region new

        public BaseSearch()
        {

        }

        #endregion

        #region dispose

        protected virtual void Dispose(bool isDisposing)
        {
            try
            {
                if (!(this.isDisposed))
                {
                    if (isDisposing)
                        this.disposeManagedResources();

                    this.disposeUnmanagedResources();
                }
            }
            finally
            {
                this.isDisposed = true;
            }
        }

        ~BaseSearch()
        {
            this.Dispose(false);
        }

        public void Dispose()
        {
            this.Dispose(true);

            GC.SuppressFinalize(this);
        }

        protected virtual void disposeManagedResources()
        {

        }

        protected virtual void disposeUnmanagedResources()
        {
            this.pagina = null;
            this.tipoorden = null;
            this.columnaorden = null;
        }

        #endregion        

    }
    */
}
