if (typeof (jsOpcion) == "undefined")
{
    jsOpcion = {};
}

jsOpcion.Variables =
{
    seleccionar: "",
}

jsOpcion.Funcion =
{
    onLoadCreate: function ()
    {
        jsCustom.item.jsObject = this;
    },

    onLoadEdit: function (isAdministradorSistema)
    {
        if (isAdministradorSistema)
            $("#formOpcionEdit_estado").select2({ placeholder: jsOpcion.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        
        jsCustom.item.jsObject = this;
    },

    setFormSubmit: function (form)
    {
        if (form == "formOpcionCreate" || form == "formOpcionEdit")
        {
            if ($("#" + form).valid())
            {
                var url = $("#" + form).attr("action");

                if (form == "formOpcionCreate")
                    url = url + "Valid";

                if (form == "formOpcionEdit")
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
