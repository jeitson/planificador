if (typeof (jsFuerzaComercial) == "undefined")
{
    jsFuerzaComercial = {};
}

jsFuerzaComercial.Variables =
{
    seleccionar: "",
}

jsFuerzaComercial.Funcion =
{
    onLoadCreate: function ()
    {
        jsCustom.item.jsObject = this;
    },

    onLoadEdit: function (isAdministradorSistema)
    {
        if (isAdministradorSistema)
            $("#formFuerzaComercialEdit_estado").select2({ placeholder: jsFuerzaComercial.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        
        jsCustom.item.jsObject = this;
    },

    setFormSubmit: function (form)
    {
        if (form == "formFuerzaComercialCreate" || form == "formFuerzaComercialEdit")
        {
            if ($("#" + form).valid())
            {
                var url = $("#" + form).attr("action");

                if (form == "formFuerzaComercialCreate")
                    url = url + "Valid";

                if (form == "formFuerzaComercialEdit")
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
