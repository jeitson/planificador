if (typeof (jsOpcionDetalle) == "undefined")
{
    jsOpcionDetalle = {};
}

jsOpcionDetalle.variables =
{
    inputtextpaginate: ["pagina", "tipoorden", "columnaorden"],
    isAdministradorSistema: false,
    seleccionar: "",
	opcionid: ""
}

jsOpcionDetalle.Funcion =
{
    onLoad: function ()
    {
        jsCustom.item.jsObject = this;
        
        this.setTableIndex(0, "", "");
        
        $("#formOpcionDetalleBusqueda").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formOpcionDetalleBusqueda"));
        $("#formOpcionDetalleCreate").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formOpcionDetalleCreate"));
        $("#formOpcionDetalleEdit").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formOpcionDetalleEdit"));

        if (jsOpcionDetalle.variables.isAdministradorSistema)
            $("#formOpcionDetalleEdit_estado").select2({ placeholder: jsOpcionDetalle.variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true, width: '100%' });

        this.setSearchAdvanced();
    },

    setTableIndex: function(nropaginas, tipoorden, columnaorden)
    {
        var columns = [{ "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": false } ];
        var isOrderJS = false;

        jsCustom.Funcion.setDataTable("tableOpcionDetalleIndex", columns, isOrderJS);
        jsCustom.Funcion.setOrderTable("tableOpcionDetalleIndex", isOrderJS, tipoorden, columnaorden);
    },

    setFormSubmit: function(form)
    {
        $("#" + form + "_opcionid").val(jsOpcionDetalle.variables.opcionid);

    	if (form == "formOpcionDetalleBusqueda")
		{
            jsCustom.Funcion.clearInputText(form, jsOpcionDetalle.variables.inputtextpaginate, "1");

            return true;
        }

        if (form == "formOpcionDetalleCreate" || form == "formOpcionDetalleEdit")
        {
            if ($("#" + form).valid())
            {
                var url = $("#" + form).attr("action");

                if (form == "formOpcionDetalleCreate")
                    url = url + "Valid";

                if (form == "formOpcionDetalleEdit")
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
		
        if (formId == "formOpcionDetalleBusqueda")
        {
            var html = jsCustom.Funcion.getValidateDefault(data.custom01, "");
            var nroPaginas = jsCustom.Funcion.getValidateDefault(data.custom02, "");
            var tipoOrden = jsCustom.Funcion.getValidateDefault(data.custom03, "");
            var columnaOrden = jsCustom.Funcion.getValidateDefault(data.custom04, "");
		
            if (html != "")
                $("#divOpcionDetalleListaBusqueda").html(html);
		
            jsCustom.Funcion.setValueHiddenforInputForm(formId);
		
            $("#" + formId + "_TipoOrden").val(tipoOrden);
            $("#" + formId + "_ColumnaOrden").val(columnaOrden);
            
            this.setTableIndex(nroPaginas, tipoOrden, columnaOrden);

            return;
        }

        if (formId == "formOpcionDetalleCreate" || formId == "formOpcionDetalleEdit")
        {
            $("#modalOpcionDetalleCreate").modal("hide");
            $("#modalOpcionDetalleEdit").modal("hide");

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
        var form = "formOpcionDetalleBusqueda";
        var inputtext = ["TipoOrden", "ColumnaOrden"];

        jsCustom.Funcion.clearInputText(form, inputtext, "");
        jsCustom.Funcion.clearInputText(form, jsOpcionDetalle.variables.inputtextpaginate, "1");

        this.setFormSubmit(form);

        $("#" + form).submit();
    },

    setCustomModal: function(obj, custom)
    {
        if (custom == "create")
        {
            var form = "formOpcionDetalleCreate";

            $("#" + form + "_nombre").val("");
            $("#" + form + "_mnemonico").val("");
            $("#" + form + "_orden").val("");
            $("#" + form + "_abreviatura").val("");
            $("#" + form + "_anexo01").val("");
            $("#" + form + "_anexo02").val("");
            $("#" + form + "_anexo03").val("");
            $("#" + form + "_anexo04").val("");
            $("#" + form + "_descripcion").val("");

            return true;
        }

        return false;
    },

    setEntityItem: function(url, objBE)
    {
        if (url == "show")
        {
            var modalform = "dataOpcionDetalle";

            $("#" + modalform + "_codigo").val(objBE.codigo);
            $("#" + modalform + "_nombre").val(objBE.nombre);
            $("#" + modalform + "_mnemonico").val(objBE.mnemonico);
            $("#" + modalform + "_orden").val(objBE.orden);
            $("#" + modalform + "_abreviatura").val(objBE.abreviatura);
            $("#" + modalform + "_anexo01").val(objBE.anexo01);
            $("#" + modalform + "_anexo02").val(objBE.anexo02);
            $("#" + modalform + "_anexo03").val(objBE.anexo03);
            $("#" + modalform + "_anexo04").val(objBE.anexo04);
            $("#" + modalform + "_descripcion").val(objBE.descripcion);
            $("#" + modalform + "_estado").val(objBE.estado.nombre);
            $("#" + modalform + "_fechamodificacion").val(jsCustom.Funcion.setFormatDateJSON(objBE.modificadopor.fecha, "ss"));
            $("#" + modalform + "_modificadopor").val(objBE.modificadopor.nombre);
            $("#" + modalform + "_fechacreacion").val(jsCustom.Funcion.setFormatDateJSON(objBE.creadopor.fecha, "ss"));
            $("#" + modalform + "_creadopor").val(objBE.creadopor.nombre);
            $("#OpcionDetalleShowName").html(objBE.nombre);

            $("#modalOpcionDetalleShow").modal('show');
        }

        if (url == "edit")
        {
            var form = "formOpcionDetalleEdit";

            $("#" + form + "_codigo").val(objBE.codigo);
            $("#" + form + "_nombre").val(objBE.nombre);
            $("#" + form + "_mnemonico").val(objBE.mnemonico);
            $("#" + form + "_orden").val(objBE.orden);
            $("#" + form + "_abreviatura").val(objBE.abreviatura);
            $("#" + form + "_valoranexo01").val(objBE.anexo01);
            $("#" + form + "_valoranexo02").val(objBE.anexo02);
            $("#" + form + "_valoranexo03").val(objBE.anexo03);
            $("#" + form + "_valoranexo04").val(objBE.anexo04);
            $("#" + form + "_descripcion").val(objBE.descripcion);
            $("#" + form + "_estado").val(objBE.estado.codigo).trigger("change");
            $("#OpcionDetalleEditName").html(objBE.nombre);

            $("#modalOpcionDetalleEdit").modal('show');
        }
    }
    
};
