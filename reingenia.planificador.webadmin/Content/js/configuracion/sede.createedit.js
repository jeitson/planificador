if (typeof (jsSede) == "undefined")
{
    jsSede = {};
}

jsSede.Variables =
{
    seleccionar: "",
}

jsSede.Funcion =
{
    onLoadCreate: function ()
    {
        $("#formSedeCreate_unidadcomercialid").select2({ placeholder: jsSede.Variables.seleccionar + "...", allowClear: true });

        jsCustom.item.jsObject = this;
    },

    onLoadEdit: function ()
    {
        $("#formSedeEdit_unidadcomercialid").select2({ placeholder: jsSede.Variables.seleccionar + "...", allowClear: true });

        jsCustom.Default.setPanel();

        jsCustom.item.jsObject = this;
    },

    setFormSubmit: function (form)
    {
        if (form == "formSedeEdit")
        {
            if ($("#" + form).valid())
            {
                var url = $("#" + form).attr("action");

                if (form == "formSedeEdit")
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
