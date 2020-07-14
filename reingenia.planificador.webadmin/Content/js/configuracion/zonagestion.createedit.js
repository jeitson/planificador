if (typeof (jsZonaGestion) == "undefined")
{
    jsZonaGestion = {};
}

jsZonaGestion =
{
    init: function ()
    {

        $(document).on("change", "#formZonaGestionCreate_nivel, #formZonaGestionEdit_nivel", function (e)
        {
            try
            {
                e.preventDefault();

                var value = jsCustom.Funcion.getValidateDefault($(this).val(), "");

                for (var i = 1; i < jsZonaGestion.Variables.niveles; i++)
                {
                    $("#divNivelSuperiorId" + (1000 + i).toString().substr(1)).hide();
                    $("#formZonaGestion" + jsZonaGestion.Variables.form + "_nivelsuperiorid" + (1000 + i).toString().substr(1)).empty();
                }

                if (value != "")
                {
                    var iValue = parseInt(value.substr(3));

                    if (iValue > 1)
                    {
                        jsCustom.Funcion.setDLLJSON(jsZonaGestion.Variables.urlListarNivelSuperiorPorNivel, { nivel: value.substring(0, 3) + "001", nivelsuperiorid: null }, "#formZonaGestion" + jsZonaGestion.Variables.form + "_nivelsuperiorid001", null);

                        $("#formZonaGestion" + jsZonaGestion.Variables.form + "_nivelsuperiorid001").val("").trigger("change");
                    }

                    for (var i = 1; i < iValue; i++)
                        $("#divNivelSuperiorId" + (1000 + i).toString().substr(1)).show();
                }
            }
            catch (e)
            {
                jsCustom.Funcion.showMessage("formZonaGestion" + jsZonaGestion.Variables.form + '_nivel: ' + e.message);
            }
        });
        
    }
};

jsZonaGestion.Variables =
{
    seleccionar: "",
    form: "",
    niveles: 0,
    urlListarNivelSuperiorPorNivel: "",
};

jsZonaGestion.Funcion =
{
    onLoadCreate: function ()
    {
        jsCustom.Default.setPanel();

        jsZonaGestion.Variables.form = "Create";
        
        for (var i = 1; i < jsZonaGestion.Variables.niveles; i++)
            $("#formZonaGestion" + jsZonaGestion.Variables.form + "_nivelsuperiorid" + (1000 + i).toString().substr(1)).select2({ placeholder: jsZonaGestion.Variables.seleccionar + "...", allowClear: true });

        $("#formZonaGestion" + jsZonaGestion.Variables.form + "_nivel").select2({ placeholder: jsZonaGestion.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });

        jsCustom.item.jsObject = this;

        jsZonaGestion.init();

        $("#formZonaGestion" + jsZonaGestion.Variables.form + "_nivel").trigger("change");

        for (var i = 1; i < jsZonaGestion.Variables.niveles; i++)
        {
            if (jsCustom.Funcion.getValidateDefault($("#formZonaGestion" + jsZonaGestion.Variables.form + "_nivelsuperioridaux" + (1000 + i).toString().substr(1)).val(), "") != "")
                $("#formZonaGestion" + jsZonaGestion.Variables.form + "_nivelsuperiorid" + (1000 + i).toString().substr(1)).val($("#formZonaGestion" + jsZonaGestion.Variables.form + "_nivelsuperioridaux" + (1000 + i).toString().substr(1)).val()).trigger("change");
        }
    },

    onLoadEdit: function (isAdministradorSistema)
    {
        jsCustom.Default.setPanel();

        jsZonaGestion.Variables.form = "Edit";

        for (var i = 1; i < jsZonaGestion.Variables.niveles; i++)
            $("#formZonaGestion" + jsZonaGestion.Variables.form + "_nivelsuperiorid" + (1000 + i).toString().substr(1)).select2({ placeholder: jsZonaGestion.Variables.seleccionar + "...", allowClear: true });

        $("#formZonaGestion" + jsZonaGestion.Variables.form + "_nivel").select2({ placeholder: jsZonaGestion.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });

        if (isAdministradorSistema)
            $("#formZonaGestionEdit_estado").select2({ placeholder: jsZonaGestion.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        
        jsCustom.item.jsObject = this;

        jsZonaGestion.init();

        $("#formZonaGestion" + jsZonaGestion.Variables.form + "_nivel").trigger("change");

        for (var i = 1; i < jsZonaGestion.Variables.niveles; i++)
        {
            if (jsCustom.Funcion.getValidateDefault($("#formZonaGestion" + jsZonaGestion.Variables.form + "_nivelsuperioridaux" + (1000 + i).toString().substr(1)).val(), "") != "")
                $("#formZonaGestion" + jsZonaGestion.Variables.form + "_nivelsuperiorid" + (1000 + i).toString().substr(1)).val($("#formZonaGestion" + jsZonaGestion.Variables.form + "_nivelsuperioridaux" + (1000 + i).toString().substr(1)).val()).trigger("change");
        }
    },

    setFormSubmit: function (form)
    {
        if (form == "formZonaGestionCreate" || form == "formZonaGestionEdit")
        {
            if ($("#" + form).valid())
            {
                var url = $("#" + form).attr("action");

                if (form == "formZonaGestionCreate")
                    url = url + "Valid";

                if (form == "formZonaGestionEdit")
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
