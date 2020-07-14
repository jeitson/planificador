if (typeof (jsAsesor) == "undefined")
{
    jsAsesor = {};
}

jsAsesor.Variables =
{
    seleccionar: "",
}

jsAsesor.Funcion =
{
    onLoadEdit: function (isAdministradorSistema)
    {
        jsCustom.item.jsObject = this;
    },

    setFormSubmit: function (form)
    {
        if (form == "formAsesorEdit")
        {
            if ($("#" + form).valid())
            {
                var url = $("#" + form).attr("action");

                if (form == "formAsesorEdit")
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
