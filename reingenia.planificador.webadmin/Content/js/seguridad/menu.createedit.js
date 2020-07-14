if (typeof (jsMenu) == "undefined")
{
    jsMenu = {};
}

jsMenu =
{
    init: function ()
    {
        $(document).on("change", "#formMenuCreate_nivelsuperiorid", function (e)
        {
            e.preventDefault();

            if ($(this).val() == "")
            {
                $("#divPermisoBox").hide();
                $("#formMenuCreate_permisoid").val("").trigger("change");
            }
            else
                $("#divPermisoBox").show();
        });
    }
}

jsMenu.Variables =
{
    seleccionar: "",
}

jsMenu.Funcion =
{
    onLoadCreate: function ()
    {
        $("#formMenuCreate_nivelsuperiorid").select2({ placeholder: jsMenu.Variables.seleccionar + "...", allowClear: true });
        $("#formMenuCreate_permisoid").select2({ placeholder: jsMenu.Variables.seleccionar + "...", allowClear: true });

        jsMenu.init();
        jsCustom.item.jsObject = this;

        $("#divPermisoBox").hide();
    },

    onLoadEdit: function (isAdministradorSistema)
    {
        $("#formMenuEdit_nivelsuperiorid").select2({ placeholder: jsMenu.Variables.seleccionar + "...", allowClear: true });
        $("#formMenuEdit_permisoid").select2({ placeholder: jsMenu.Variables.seleccionar + "...", allowClear: true });

        if (isAdministradorSistema)
            $("#formMenuEdit_estado").select2({ placeholder: jsMenu.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        
        jsCustom.item.jsObject = this;
    },

    setFormSubmit: function (form)
    {
        if (form == "formMenuCreate" || form == "formMenuEdit")
        {
            if ($("#" + form).valid())
            {
                var url = $("#" + form).attr("action");

                if (form == "formMenuCreate")
                    url = url + "Valid";

                if (form == "formMenuEdit")
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
