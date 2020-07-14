if (typeof (jsEtiquetaGestion) == "undefined")
{
    jsEtiquetaGestion = {};
}

jsEtiquetaGestion.Variables =
{
    seleccionar: "",
}

jsEtiquetaGestion.Funcion =
{
    onLoadCreate: function ()
    {
        $("#formEtiquetaGestionCreate_clasificacionresultado").select2({ placeholder: jsEtiquetaGestion.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });

        this.setBoolICheck("formEtiquetaGestionCreate", "esgestion");

        jsCustom.item.jsObject = this;
    },

    onLoadEdit: function (isAdministradorSistema)
    {
        $("#formEtiquetaGestionEdit_clasificacionresultado").select2({ placeholder: jsEtiquetaGestion.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });

        this.setBoolICheck("formEtiquetaGestionEdit", "esgestion");

        if (isAdministradorSistema)
            $("#formEtiquetaGestionEdit_estado").select2({ placeholder: jsEtiquetaGestion.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        
        jsCustom.item.jsObject = this;
    },

    setFormSubmit: function (form)
    {
        if (form == "formEtiquetaGestionCreate" || form == "formEtiquetaGestionEdit")
        {
            if ($("#" + form).valid())
            {
                var url = $("#" + form).attr("action");

                if (form == "formEtiquetaGestionCreate")
                    url = url + "Valid";

                if (form == "formEtiquetaGestionEdit")
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
