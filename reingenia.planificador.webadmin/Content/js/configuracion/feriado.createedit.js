if (typeof (jsFeriado) == "undefined")
{
    jsFeriado = {};
}

jsFeriado.Variables =
{
    seleccionar: "",
}

jsFeriado.Funcion =
{
    onLoadCreate: function ()
    {
        jsCustom.Funcion.setDatePicker("#formFeriadoCreate_fecha", "bottom");

        jsCustom.item.jsObject = this;
    },

    onLoadEdit: function (isAdministradorSistema)
    {
        jsCustom.Funcion.setDatePicker("#formFeriadoEdit_fecha", "bottom");

        if (isAdministradorSistema)
            $("#formFeriadoEdit_estado").select2({ placeholder: jsFeriado.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        
        jsCustom.item.jsObject = this;
    },

    setFormSubmit: function (form)
    {
        if (form == "formFeriadoCreate" || form == "formFeriadoEdit")
        {
            if ($("#" + form).valid())
            {
                var url = $("#" + form).attr("action");

                if (form == "formFeriadoCreate")
                    url = url + "Valid";

                if (form == "formFeriadoEdit")
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
