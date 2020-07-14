using reingenia.planificador.webadmin.Resources;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace reingenia.planificador.webadmin.Models
{

    public class vmLogin : BaseModel
    {

        #region atributos        

        [Required(ErrorMessageResourceName = "login_model_requiredusername", ErrorMessageResourceType = typeof(authentication))]
        [StringLength(15, MinimumLength = 2, ErrorMessageResourceName = "login_model_stringlengthusername", ErrorMessageResourceType = typeof(authentication))]
        public string username { get; set; }

        [Required(ErrorMessageResourceName = "login_model_requiredpassword", ErrorMessageResourceType = typeof(authentication))]
        [DataType(DataType.Password, ErrorMessageResourceName = "login_model_datatypepassword", ErrorMessageResourceType = typeof(authentication))]
        [StringLength(15, MinimumLength = 6, ErrorMessageResourceName = "login_model_stringlengthpassword", ErrorMessageResourceType = typeof(authentication))]
        public string password { get; set; }

        public bool rememberme { get; set; }

        #endregion

        #region funciones

        public vmLogin getData()
        {
            List<string> lstError = new List<string>();

            this.username = Assess.getStringLower(this.username, lstError, authentication.login_model_requiredusername, true);
            this.password = Assess.getString(this.password, lstError, authentication.login_model_requiredpassword, true);

            if (lstError.Count > 0)
                throw new Exception(string.Join("|", lstError));

            return this;
        }

        #endregion

        #region base

        public vmLogin()
        {

        }

        protected override void disposeUnmanagedResources()
        {
            try
            {
                this.username = null;
                this.password = null;
                this.rememberme = false;
            }
            finally
            {
                base.disposeUnmanagedResources();
            }
        }

        #endregion

    }

}
