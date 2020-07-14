if (typeof (jsParametro) == "undefined")
{
    jsParametro = {};
}

jsParametro.Variables =
{
    seleccionar: "",
}

jsParametro.Funcion =
{
    onLoadCreate: function ()
    {
        jsCustom.item.jsObject = this;
    },

    onLoadEdit: function (isAdministradorSistema)
    {
        if (isAdministradorSistema)
            $("#formParametroEdit_estado").select2({ placeholder: jsParametro.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        
        jsCustom.item.jsObject = this;
    },

    setFormSubmit: function (form)
    {
        if (form == "formParametroCreate" || form == "formParametroEdit")
        {
            if ($("#" + form).valid())
            {
                var url = $("#" + form).attr("action");

                if (form == "formParametroCreate")
                    url = url + "Valid";

                if (form == "formParametroEdit")
                    url = url.replace("Edit", "EditValid");

                var data = $("#" + form).serialize();
                var isOK = jsCustom.Funcion.getValidSave(url, data);
                
                return isOK;
            }
            else 
                return false;
        }

        return true;
    }
    
};
