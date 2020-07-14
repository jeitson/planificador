if (typeof (jsClienteConfiguracion) == "undefined")
{
    jsClienteConfiguracion = {};
}

jsClienteConfiguracion.Variables =
{
    seleccionar: "",
}

jsClienteConfiguracion.Funcion =
{
    onLoadCreate: function ()
    {
        this.setBoolICheck("formClienteConfiguracionCreate", "esmultiplelinea");

        jsCustom.item.jsObject = this;
    },

    onLoadEdit: function (isAdministradorSistema)
    {
        this.setBoolICheck("formClienteConfiguracionEdit", "esmultiplelinea");

        if (isAdministradorSistema)
            $("#formClienteConfiguracionEdit_estado").select2({ placeholder: jsClienteConfiguracion.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        
        jsCustom.item.jsObject = this;
    },

    setFormSubmit: function (form)
    {
        if (form == "formClienteConfiguracionCreate" || form == "formClienteConfiguracionEdit")
        {
            if ($("#" + form).valid())
            {
                var url = $("#" + form).attr("action");

                if (form == "formClienteConfiguracionCreate")
                    url = url + "Valid";

                if (form == "formClienteConfiguracionEdit")
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

    setBoolICheck: function (form, field)
    {
        $("#" + form + "_" + field + "_no").iCheck({ checkboxClass: 'icheckbox_square-green', radioClass: 'iradio_square-green', increaseArea: "10%" }).on('ifChecked', function (e) {
            var isChecked = e.currentTarget.checked;

            if (isChecked == true)
                $("#" + form + "_" + field).val("0");
        });

        $("#" + form + "_" + field + "_si").iCheck({ checkboxClass: 'icheckbox_square-green', radioClass: 'iradio_square-green', increaseArea: "10%" }).on('ifChecked', function (e) {
            var isChecked = e.currentTarget.checked;

            if (isChecked == true)
                $("#" + form + "_" + field).val("1");
        });

        if (jsCustom.Funcion.getValidateDefault($("#" + form + "_" + field).val(), "0") == "1")
            $("#" + form + "_" + field + "_si").iCheck('check');
        else
            $("#" + form + "_" + field + "_no").iCheck('check');
    }
    
};
