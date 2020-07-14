if (typeof (jsSedeZonaGestion) == "undefined")
{
    jsSedeZonaGestion = {};
}

jsSedeZonaGestion =
{
    init: function ()
    {
        $(document).on("change", "#formSedeZonaGestionCreate_nivelzonagestion", function (e)
        {
            try
            {
                e.preventDefault();

                var value = jsCustom.Funcion.getValidateDefault($(this).val(), "");

                for (var i = 1; i <= jsSedeZonaGestion.variables.niveles; i++)
                {
                    $("#divNivelSuperiorId" + (1000 + i).toString().substr(1)).hide();
                    $("#formSedeZonaGestion" + jsSedeZonaGestion.variables.form + "_nivelsuperiorid" + (1000 + i).toString().substr(1)).empty();
                }

                $("#divGuardar").hide();

                if (value != "")
                {
                    var iValue = parseInt(value.substr(3));

                    if (iValue >= 1)
                    {
                        jsCustom.Funcion.setDLLJSON(jsSedeZonaGestion.variables.urlListarNivelSuperiorPorNivel, { nivel: value.substring(0, 3) + "001", nivelsuperiorid: null }, "#formSedeZonaGestion" + jsSedeZonaGestion.variables.form + "_nivelsuperiorid001", null);

                        $("#formSedeZonaGestion" + jsSedeZonaGestion.variables.form + "_nivelsuperiorid001").val("").trigger("change");
                    }

                    for (var i = 1; i <= iValue; i++)
                        $("#divNivelSuperiorId" + (1000 + i).toString().substr(1)).show();

                    $("#divGuardar").show();
                }
            }
            catch (e)
            {
                jsCustom.Funcion.showMessage("formSedeZonaGestion" + jsSedeZonaGestion.variables.form + '_nivel: ' + e.message);
            }
        });
        
        $(document).on("change", ".nivelsuperiorzonagestion", function (e)
        {
            try
            {
                e.preventDefault();
                
                var iId = parseInt($(this).attr('id').replace("formSedeZonaGestion" + jsSedeZonaGestion.variables.form + "_nivelsuperiorid", ""));
                var value = jsCustom.Funcion.getValidateDefault($(this).val(), "");
                var nivel = jsCustom.Funcion.getValidateDefault($("#formSedeZonaGestion" + jsSedeZonaGestion.variables.form + "_nivelzonagestion").val(), "");
                
                if (nivel != "")
                {
                    var iNivel = parseInt(nivel.substr(3));

                    if (iNivel == iId)
                        return;

                    if (value == "")
                        return;
                    
                    jsCustom.Funcion.setDLLJSON(jsSedeZonaGestion.variables.urlListarNivelSuperiorPorNivel, { nivel: nivel.substring(0, 3) + (1001 + iId).toString().substr(1), nivelsuperiorid: value }, "#formSedeZonaGestion" + jsSedeZonaGestion.variables.form + "_nivelsuperiorid" + (1001 + iId).toString().substr(1), null);

                    $("#formSedeZonaGestion" + jsSedeZonaGestion.variables.form + "_nivelsuperiorid" + (1001 + iId).toString().substr(1)).val("").trigger("change");
                }
            }
            catch (e)
            {
                jsCustom.Funcion.showMessage("formSedeZonaGestion" + jsSedeZonaGestion.variables.form + ' .nivelsuperiorid: ' + e.message);
            }
        });
    }
};

jsSedeZonaGestion.variables =
{
    inputtextpaginate: ["pagina", "tipoorden", "columnaorden"],
    isAdministradorSistema: false,
    seleccionar: "",
    sedeid: "",
    urlListarNivelSuperiorPorNivel: "",
    jsSede: null,
    titleEnabled: "",
    messageEnabled: "",
    niveles: 0,
    form: "",
    isShow: false,
};

jsSedeZonaGestion.Funcion =
{
    onLoad: function ()
    {
        jsCustom.item.jsObject = this;
        
        this.setTableIndex(0, "", "");
        
        $("#formSedeZonaGestionBusqueda").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formSedeZonaGestionBusqueda"));
        $("#formSedeZonaGestionCreate").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formSedeZonaGestionCreate"));
        
        jsSedeZonaGestion.variables.form = "Create";

        for (var i = 1; i <= jsSedeZonaGestion.variables.niveles; i++)
            $("#formSedeZonaGestion" + jsSedeZonaGestion.variables.form + "_nivelsuperiorid" + (1000 + i).toString().substr(1)).select2({ placeholder: jsSedeZonaGestion.variables.seleccionar + "...", allowClear: true });

        $("#formSedeZonaGestion" + jsSedeZonaGestion.variables.form + "_nivelzonagestion").select2({ placeholder: jsSedeZonaGestion.variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });

        jsSedeZonaGestion.variables.jsSede = jsSede.Funcion;

        jsSedeZonaGestion.init();

        this.setSearchAdvanced();

        $("#formSedeZonaGestion" + jsSedeZonaGestion.variables.form + "_nivelzonagestion").trigger("change");
    },

    onLoadShow: function ()
    {
        this.setTableIndex(0, "", "");

        $("#formSedeZonaGestionBusqueda").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formSedeZonaGestionBusqueda"));

        this.setSearchAdvanced();
    },

    setTableIndex: function(nropaginas, tipoorden, columnaorden)
    {
        var columns = [{ "bSortable": true }, { "bSortable": true }, { "bSortable": false } ];
        var isOrderJS = false;

        jsCustom.Funcion.setDataTable("tableSedeZonaGestionIndex", columns, isOrderJS);
        jsCustom.Funcion.setOrderTable("tableSedeZonaGestionIndex", isOrderJS, tipoorden, columnaorden);
    },

    setFormSubmit: function(form)
    {
    	$("#" + form + "_sedeid").val(jsSedeZonaGestion.variables.sedeid);

    	if (form == "formSedeZonaGestionBusqueda")
		{
            jsCustom.Funcion.clearInputText(form, jsSedeZonaGestion.variables.inputtextpaginate, "1");

			return true;
		}

        if (form == "formSedeZonaGestionCreate")
        {
            var nivelzonagestion = jsCustom.Funcion.getValidateDefault($("#" + form + "_nivelzonagestion").val(), "");

            if (nivelzonagestion == "")
                return;

            var zonagestionid = jsCustom.Funcion.getValidateDefault($("#" + form + "_nivelsuperiorid" + nivelzonagestion.substr(3)).val(), "");

            if (zonagestionid == "")
                return;

            $("#" + form + "_zonagestionid").val(zonagestionid);

            if ($("#" + form).valid())
            {
                var url = $("#" + form).attr("action");

                if (form == "formSedeZonaGestionCreate")
                    url = url + "Valid";

                var data = $("#" + form).serialize();
                var isOK = jsCustom.Funcion.getValidSave(url, data);

                return isOK;
            }
        }

        if (form == "formSedeEdit")
            return jsSedeZonaGestion.variables.jsSede.setFormSubmit(form);

        return false;
    },

    successForm: function(formId, data)
    {
        var error = jsCustom.Funcion.getValidateDefault(data.isError, "");
		
        if (error == "S")
        {
            jsCustom.Funcion.showMessage(jsCustom.Funcion.getValidateDefault(data.message, ""));
		
            return;
        }
		
        if (formId == "formSedeZonaGestionBusqueda")
        {
            var html = jsCustom.Funcion.getValidateDefault(data.custom01, "");
            var nroPaginas = jsCustom.Funcion.getValidateDefault(data.custom02, "");
            var tipoOrden = jsCustom.Funcion.getValidateDefault(data.custom03, "");
            var columnaOrden = jsCustom.Funcion.getValidateDefault(data.custom04, "");
		
            if (html != "")
                $("#divSedeZonaGestionListaBusqueda").html(html);
		
            jsCustom.Funcion.setValueHiddenforInputForm(formId);
		
            $("#" + formId + "_TipoOrden").val(tipoOrden);
            $("#" + formId + "_ColumnaOrden").val(columnaOrden);
            
            this.setTableIndex(nroPaginas, tipoOrden, columnaOrden);

            if (jsSedeZonaGestion.variables.isShow)
                $('#tableSedeZonaGestionIndex th:nth-child(3),#tableSedeZonaGestionIndex td:nth-child(3)').remove();

			return;
        }

        if (formId == "formSedeZonaGestionCreate")
        {
            $("#" + formId + "_nivelzonagestion").val("").trigger("change");

            this.setSearchAdvanced();

            return;
        }
    },

    setDeleteItem: function(custom)
    {
        if (custom == "disabled" || custom == "delete" || custom == "enabled")
            this.setSearchAdvanced();
    },

    setSearchAdvanced: function()
    {
        var form = "formSedeZonaGestionBusqueda";
        var inputtext = ["TipoOrden", "ColumnaOrden"];

        jsCustom.Funcion.clearInputText(form, inputtext, "");
        jsCustom.Funcion.clearInputText(form, jsSedeZonaGestion.variables.inputtextpaginate, "1");

        $("#" + form + "_sedeid").val(jsSedeZonaGestion.variables.sedeid);
        $("#" + form).submit();
    },

    setRefresh: function (obj, div)
    {
        if (div == "SedeZonaGestion")
            this.setSearchAdvanced();
    },

    setMessage: function (custom, item)
    {
        if (custom == "enabled")
        {
            item.title = jsSedeZonaGestion.variables.titleEnabled;
            item.message = jsSedeZonaGestion.variables.messageEnabled;
        }

        return item;
    }
    
};
