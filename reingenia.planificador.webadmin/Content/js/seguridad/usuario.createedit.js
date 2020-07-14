if (typeof (jsUsuario) == "undefined")
{
    jsUsuario = {};
}

jsUsuario =
{
    init: function ()
    {
        $(document).on("change", "#formUsuarioCreate_tipojerarquia", function (e)
        {
            try
            {
                e.preventDefault();
        
                $("#formUsuarioCreate_unidadcomercialid").empty();

                if ($(this).val() != "")
                    jsCustom.Funcion.setDLLJSON(jsUsuario.Variables.urlUnidadComercialPorJerarquia, { jerarquia: $(this).val() }, "#formUsuarioCreate_unidadcomercialid", null);
                
                $("#formUsuarioCreate_unidadcomercialid").val("").trigger("change");
            }
            catch (e)
            {
                jsCustom.Funcion.showMessage('formUsuarioCreate_tipojerarquia: ' + e.message);
            }
        });

        $(document).on("change", "#formUsuarioEdit_tipojerarquia", function (e)
        {
            try
            {
                e.preventDefault();
        
                $("#formUsuarioEdit_unidadcomercialid").empty();

                if ($(this).val() != "")
                    jsCustom.Funcion.setDLLJSON(jsUsuario.Variables.urlUnidadComercialPorJerarquia, { jerarquia: $(this).val() }, "#formUsuarioEdit_unidadcomercialid", null);
                
                $("#formUsuarioEdit_unidadcomercialid").val("").trigger("change");
            }
            catch (e)
            {
                jsCustom.Funcion.showMessage('formUsuarioEdit_tipojerarquia: ' + e.message);
            }
        });
    }
}

jsUsuario.Variables =
{
    seleccionar: "",
    urlUnidadComercialPorJerarquia: ""
}

jsUsuario.Funcion =
{
    onLoadCreate: function ()
    {
        $("#formUsuarioCreate_tipojerarquia").select2({ placeholder: jsUsuario.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        $("#formUsuarioCreate_unidadcomercialid").select2({ placeholder: jsUsuario.Variables.seleccionar + "...", allowClear: true });
        $("#formUsuarioCreate_asesorid").select2({ placeholder: jsUsuario.Variables.seleccionar + "...", allowClear: true });

        jsUsuario.init();
        jsCustom.item.jsObject = this;
    },

    onLoadEdit: function (isAdministradorSistema)
    {
        $("#formUsuarioEdit_tipojerarquia").select2({ placeholder: jsUsuario.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        $("#formUsuarioEdit_unidadcomercialid").select2({ placeholder: jsUsuario.Variables.seleccionar + "...", allowClear: true });
        $("#formUsuarioEdit_asesorid").select2({ placeholder: jsUsuario.Variables.seleccionar + "...", allowClear: true });

        if (isAdministradorSistema)
            $("#formUsuarioEdit_estado").select2({ placeholder: jsUsuario.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });

        jsUsuario.init();

        $("#formUsuarioEdit_tipojerarquia").trigger("change");
        $("#formUsuarioEdit_unidadcomercialid").val($("#formUsuarioEdit_unidadcomercialidaux").val()).trigger("change");

        jsCustom.item.jsObject = this;
    },

    onLoadPassword: function ()
    {
        jsCustom.item.jsObject = this;
    },

    onLoadYourPassword: function ()
    {
        jsCustom.item.jsObject = this;
    },

    onLoadSetRole: function ()
    {
        jsCustom.item.jsObject = this;

        iCheckMain.init();
    },

    setFormSubmit: function (form)
    {
        if (form == "formUsuarioCreate" || form == "formUsuarioEdit")
        {
            if ($("#" + form).valid())
            {
                var url = $("#" + form).attr("action");

                if (form == "formUsuarioCreate")
                    url = url + "Valid";

                if (form == "formUsuarioEdit")
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
