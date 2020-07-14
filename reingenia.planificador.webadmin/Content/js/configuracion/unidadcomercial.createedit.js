if (typeof (jsUnidadComercial) == "undefined")
{
    jsUnidadComercial = {};
}

jsUnidadComercial =
{
    init: function ()
    {
        $(document).on("change", "#formUnidadComercialCreate_nivel, #formUnidadComercialEdit_nivel", function (e)
        {
            try
            {
                e.preventDefault();

                var value = jsCustom.Funcion.getValidateDefault($(this).val(), "");

                for (var i = 1; i < jsUnidadComercial.Variables.niveles; i++)
                {
                    $("#divNivelSuperiorId" + (1000 + i).toString().substr(1)).hide();
                    $("#formUnidadComercial" + jsUnidadComercial.Variables.form + "_nivelsuperiorid" + (1000 + i).toString().substr(1)).empty();
                }

                if (value != "")
                {
                    var iValue = parseInt(value.substr(3));

                    if (iValue > 1)
                    {
                        jsCustom.Funcion.setDLLJSON(jsUnidadComercial.Variables.urlListarNivelSuperiorPorNivel, { nivel: value.substring(0, 3) + "001", nivelsuperiorid: null }, "#formUnidadComercial" + jsUnidadComercial.Variables.form + "_nivelsuperiorid001", null);

                        $("#formUnidadComercial" + jsUnidadComercial.Variables.form + "_nivelsuperiorid001").val("").trigger("change");
                    }

                    for (var i = 1; i < iValue; i++)
                        $("#divNivelSuperiorId" + (1000 + i).toString().substr(1)).show();
                }
            }
            catch (e)
            {
                jsCustom.Funcion.showMessage("formUnidadComercial" + jsUnidadComercial.Variables.form + '_nivel: ' + e.message);
            }
        });
        
        $(document).on("change", ".nivelsuperiorid", function (e)
        {
            try
            {
                e.preventDefault();
                
                var iId = parseInt($(this).attr('id').replace("formUnidadComercial" + jsUnidadComercial.Variables.form + "_nivelsuperiorid", ""));
                var value = jsCustom.Funcion.getValidateDefault($(this).val(), "");
                var nivel = jsCustom.Funcion.getValidateDefault($("#formUnidadComercial" + jsUnidadComercial.Variables.form + "_nivel").val(), "");
                
                if (nivel != "")
                {
                    var iNivel = parseInt(nivel.substr(3) - 1);

                    if (iNivel == iId)
                        return;

                    if (value == "")
                        return;
                    
                    jsCustom.Funcion.setDLLJSON(jsUnidadComercial.Variables.urlListarNivelSuperiorPorNivel, { nivel: nivel.substring(0, 3) + (1001 + iId).toString().substr(1), nivelsuperiorid: value }, "#formUnidadComercial" + jsUnidadComercial.Variables.form + "_nivelsuperiorid" + (1001 + iId).toString().substr(1), null);

                    $("#formUnidadComercial" + jsUnidadComercial.Variables.form + "_nivelsuperiorid" + (1001 + iId).toString().substr(1)).val("").trigger("change");
                }
            }
            catch (e)
            {
                jsCustom.Funcion.showMessage("formUnidadComercial" + jsUnidadComercial.Variables.form + ' .nivelsuperiorid: ' + e.message);
            }
        });
    }
}

jsUnidadComercial.Variables =
{
    seleccionar: "",
    form: "",
    niveles: 0,
    urlListarNivelSuperiorPorNivel: "",
}

jsUnidadComercial.Funcion =
{
    onLoadCreate: function ()
    {
        jsCustom.Default.setPanel();

        jsUnidadComercial.Variables.form = "Create";

        for (var i = 1; i < jsUnidadComercial.Variables.niveles; i++)
            $("#formUnidadComercial" + jsUnidadComercial.Variables.form + "_nivelsuperiorid" + (1000 + i).toString().substr(1)).select2({ placeholder: jsUnidadComercial.Variables.seleccionar + "...", allowClear: true });
        
        $("#formUnidadComercial" + jsUnidadComercial.Variables.form + "_nivel").select2({ placeholder: jsUnidadComercial.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });

        jsCustom.item.jsObject = this;

        jsUnidadComercial.init();

        $("#formUnidadComercial" + jsUnidadComercial.Variables.form + "_nivel").trigger("change");

        for (var i = 1; i < jsUnidadComercial.Variables.niveles; i++)
        {
            if (jsCustom.Funcion.getValidateDefault($("#formUnidadComercial" + jsUnidadComercial.Variables.form + "_nivelsuperioridaux" + (1000 + i).toString().substr(1)).val(), "") != "")
                $("#formUnidadComercial" + jsUnidadComercial.Variables.form + "_nivelsuperiorid" + (1000 + i).toString().substr(1)).val($("#formUnidadComercial" + jsUnidadComercial.Variables.form + "_nivelsuperioridaux" + (1000 + i).toString().substr(1)).val()).trigger("change");
        }
    },

    onLoadEdit: function (isAdministradorSistema)
    {
        jsCustom.Default.setPanel();

        jsUnidadComercial.Variables.form = "Edit";

        for (var i = 1; i < jsUnidadComercial.Variables.niveles; i++)
            $("#formUnidadComercial" + jsUnidadComercial.Variables.form + "_nivelsuperiorid" + (1000 + i).toString().substr(1)).select2({ placeholder: jsUnidadComercial.Variables.seleccionar + "...", allowClear: true });

        $("#formUnidadComercial" + jsUnidadComercial.Variables.form + "_nivel").select2({ placeholder: jsUnidadComercial.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });

        if (isAdministradorSistema)
            $("#formUnidadComercial" + jsUnidadComercial.Variables.form + "_estado").select2({ placeholder: jsUnidadComercial.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        
        jsCustom.item.jsObject = this;

        jsUnidadComercial.init();

        $("#formUnidadComercial" + jsUnidadComercial.Variables.form + "_nivel").trigger("change");

        for (var i = 1; i < jsUnidadComercial.Variables.niveles; i++)
        {
            if (jsCustom.Funcion.getValidateDefault($("#formUnidadComercial" + jsUnidadComercial.Variables.form + "_nivelsuperioridaux" + (1000 + i).toString().substr(1)).val(), "") != "")
                $("#formUnidadComercial" + jsUnidadComercial.Variables.form + "_nivelsuperiorid" + (1000 + i).toString().substr(1)).val($("#formUnidadComercial" + jsUnidadComercial.Variables.form + "_nivelsuperioridaux" + (1000 + i).toString().substr(1)).val()).trigger("change");
        }
    },

    setFormSubmit: function (form)
    {
        if (form == "formUnidadComercialCreate" || form == "formUnidadComercialEdit")
        {
            if ($("#" + form).valid())
            {
                var url = $("#" + form).attr("action");

                if (form == "formUnidadComercialCreate")
                    url = url + "Valid";

                if (form == "formUnidadComercialEdit")
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
