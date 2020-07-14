if (typeof (jsPermiso) == "undefined")
{
    jsPermiso = {};
}

jsPermiso.Variables =
{
    seleccionar: "",
}

jsPermiso.Funcion =
{
    onLoadCreate: function ()
    {
        $("#formPermisoCreate_nivelsuperiorid").select2({ placeholder: jsPermiso.Variables.seleccionar + "...", allowClear: true });

        this.setBoolICheck("formPermisoCreate", "esraiz");

        jsCustom.item.jsObject = this;
    },

    onLoadEdit: function (isAdministradorSistema)
    {
        $("#formPermisoEdit_nivelsuperiorid").select2({ placeholder: jsPermiso.Variables.seleccionar + "...", allowClear: true });

        if (isAdministradorSistema)
            $("#formPermisoEdit_estado").select2({ placeholder: jsPermiso.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });

        this.setBoolICheck("formPermisoEdit", "esraiz");

        jsCustom.item.jsObject = this;
    },

    setFormSubmit: function (form)
    {
        if (form == "formPermisoCreate" || form == "formPermisoEdit")
        {
            if ($("#" + form).valid())
            {
                var url = $("#" + form).attr("action");

                if (form == "formPermisoCreate")
                    url = url + "Valid";

                if (form == "formPermisoEdit")
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
