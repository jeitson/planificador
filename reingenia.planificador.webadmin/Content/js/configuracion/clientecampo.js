if (typeof (jsClienteCampo) == "undefined")
{
    jsClienteCampo = {};
}

jsClienteCampo.variables =
{
    inputtextpaginate: ["pagina", "tipoorden", "columnaorden"],
    isAdministradorSistema: false,
    seleccionar: "",
    clienteconfiguracionid: "",
}

jsClienteCampo.Funcion =
{
    onLoad: function ()
    {
        jsCustom.item.jsObject = this;
        
        this.setTableIndex(0, "", "");

        $("#formClienteCampoCreate_tipoinformacion").select2({ placeholder: jsClienteCampo.variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true, width: '100%' });

        $("#formClienteCampoEdit_tipoinformacion").select2({ placeholder: jsClienteCampo.variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true, width: '100%' });

        $("#formClienteCampoBusqueda").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formClienteCampoBusqueda"));
        $("#formClienteCampoCreate").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formClienteCampoCreate"));
        $("#formClienteCampoEdit").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formClienteCampoEdit"));

        if (jsClienteCampo.variables.isAdministradorSistema)
            $("#formClienteCampoEdit_estado").select2({ placeholder: jsClienteCampo.variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true, width: '100%' });
        
        this.setSearchAdvanced();
    },

    setTableIndex: function(nropaginas, tipoorden, columnaorden)
    {
        var columns = [{ "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": false } ];
        var isOrderJS = false;

        jsCustom.Funcion.setDataTable("tableClienteCampoIndex", columns, isOrderJS);
        jsCustom.Funcion.setOrderTable("tableClienteCampoIndex", isOrderJS, tipoorden, columnaorden);
    },

    setFormSubmit: function(form)
    {
        $("#" + form + "_clienteconfiguracionid").val(jsClienteCampo.variables.clienteconfiguracionid);

    	if (form == "formClienteCampoBusqueda")
		{
            jsCustom.Funcion.clearInputText(form, jsClienteCampo.variables.inputtextpaginate, "1");

			return true;
		}

        if (form == "formClienteCampoCreate" || form == "formClienteCampoEdit")
        {
            if ($("#" + form).valid())
            {
                var url = $("#" + form).attr("action");

                if (form == "formClienteCampoCreate")
                    url = url + "Valid";

                if (form == "formClienteCampoEdit")
                    url = url.replace("Edit", "EditValid");

                var data = $("#" + form).serialize();
                var isOK = jsCustom.Funcion.getValidSave(url, data);

                return isOK;
            }
        }

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
		
        if (formId == "formClienteCampoBusqueda")
        {
            var html = jsCustom.Funcion.getValidateDefault(data.custom01, "");
            var nroPaginas = jsCustom.Funcion.getValidateDefault(data.custom02, "");
            var tipoOrden = jsCustom.Funcion.getValidateDefault(data.custom03, "");
            var columnaOrden = jsCustom.Funcion.getValidateDefault(data.custom04, "");
		
            if (html != "")
                $("#divClienteCampoListaBusqueda").html(html);
		
            jsCustom.Funcion.setValueHiddenforInputForm(formId);
		
            $("#" + formId + "_TipoOrden").val(tipoOrden);
            $("#" + formId + "_ColumnaOrden").val(columnaOrden);
            
            this.setTableIndex(nroPaginas, tipoOrden, columnaOrden);

			return;
        }

        if (formId == "formClienteCampoCreate" || formId == "formClienteCampoEdit")
        {
            $("#" + formId.replace("form", "modal")).modal("hide");

            this.setSearchAdvanced();

            return;
        }
    },

    setDeleteItem: function(custom)
    {
        if (custom == "disabled" || custom == "delete")
            this.setSearchAdvanced();
    },

    setSearchAdvanced: function()
    {
        var form = "formClienteCampoBusqueda";
        var inputtext = ["TipoOrden", "ColumnaOrden"];

        jsCustom.Funcion.clearInputText(form, inputtext, "");
        jsCustom.Funcion.clearInputText(form, jsClienteCampo.variables.inputtextpaginate, "1");

        $("#" + form + "_clienteconfiguracionid").val(jsClienteCampo.variables.clienteconfiguracionid);

        $("#" + form).submit();
    },

    setCustomModal: function(obj, custom)
    {
        if (custom == "create")
        {
            var form = "formClienteCampoCreate";

            $("#" + form + "_titulo").val("");
            $("#" + form + "_campoorigen").val("");
            $("#" + form + "_ordenllave").val("");
            $("#" + form + "_ordencampo").val("");
            $("#" + form + "_anchocampo").val("");
            $("#" + form + "_ordentitulo").val("");
            $("#" + form + "_anchotitulo").val("");
            $("#" + form + "_descripcion").val("");

            return true;
        }

        return false;
    },

    setEntityItem: function(url, objBE)
    {
        if (url == "show")
        {
            var modalform = "dataClienteCampo";

            $("#" + modalform + "_titulo").val(objBE.titulo);
            $("#" + modalform + "_campoorigen").val(objBE.campoorigen);
            $("#" + modalform + "_ordenllave").val(objBE.ordenllave);
            $("#" + modalform + "_ordencampo").val(objBE.ordencampo);
            $("#" + modalform + "_anchocampo").val(objBE.anchocampo);
            $("#" + modalform + "_ordentitulo").val(objBE.ordentitulo);
            $("#" + modalform + "_anchotitulo").val(objBE.anchotitulo);
            $("#" + modalform + "_tipoinformacion").val(objBE.tipoinformacion.nombre);
            $("#" + modalform + "_descripcion").val(objBE.descripcion);
            $("#" + modalform + "_estado").val(objBE.estado.nombre);
            $("#" + modalform + "_fechamodificacion").val(jsCustom.Funcion.setFormatDateJSON(objBE.modificadopor.fecha, "ss"));
            $("#" + modalform + "_modificadopor").val(objBE.modificadopor.nombre);
            $("#" + modalform + "_fechacreacion").val(jsCustom.Funcion.setFormatDateJSON(objBE.creadopor.fecha, "ss"));
            $("#" + modalform + "_creadopor").val(objBE.creadopor.nombre);
			$("#ClienteCampoShowName").html(objBE.nombre);

            $("#modalClienteCampoShow").modal("show");
        }

        if (url == "edit")
        {
            var form = "formClienteCampoEdit";

            $("#" + form + "_id").val(objBE.id);
            $("#" + form + "_titulo").val(objBE.titulo);
            $("#" + form + "_campoorigen").val(objBE.campoorigen);
            $("#" + form + "_ordenllave").val(objBE.ordenllave);
            $("#" + form + "_ordencampo").val(objBE.ordencampo);
            $("#" + form + "_anchocampo").val(objBE.anchocampo);
            $("#" + form + "_ordentitulo").val(objBE.ordentitulo);
            $("#" + form + "_anchotitulo").val(objBE.anchotitulo);
            $("#" + form + "_tipoinformacion").val(objBE.tipoinformacion.codigo).trigger("change");
            $("#" + form + "_descripcion").val(objBE.descripcion);
            $("#" + form + "_estado").val(objBE.estado.codigo).trigger("change");
            $("#ClienteCampoEditName").html(objBE.nombre);

            $("#modalClienteCampoEdit").modal("show");
        }
    },
    
};
