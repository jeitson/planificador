if (typeof (jsDispositivo) == "undefined")
{
    jsDispositivo = {};
}

jsDispositivo.Variables =
{
    seleccionar: "",
}

jsDispositivo.Funcion =
{
    onLoadCreate: function ()
    {
        $("#formDispositivoCreate_tipo").select2({ placeholder: jsDispositivo.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });

        jsCustom.item.jsObject = this;
    },

    onLoadEdit: function (isAdministradorSistema)
    {
        $("#formDispositivoEdit_tipo").select2({ placeholder: jsDispositivo.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });

        if (isAdministradorSistema)
            $("#formDispositivoEdit_estado").select2({ placeholder: jsDispositivo.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        
        jsCustom.item.jsObject = this;
    },

    setFormSubmit: function (form)
    {
        if (form == "formDispositivoCreate" || form == "formDispositivoEdit")
        {
            if ($("#" + form).valid())
            {
                var url = $("#" + form).attr("action");

                if (form == "formDispositivoCreate")
                    url = url + "Valid";

                if (form == "formDispositivoEdit")
                    url = url.replace("Edit", "EditValid");

                var data = $("#" + form).serialize();
                var isOK = jsCustom.Funcion.getValidSave(url, data);
                
                return isOK;
            }
            else 
                return false;
        }

        return true;
    },
    
};
