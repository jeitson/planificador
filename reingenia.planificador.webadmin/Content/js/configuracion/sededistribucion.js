if (typeof (jsSedeDistribucion) == "undefined")
{
    jsSedeDistribucion = {};
}

jsSedeDistribucion.variables =
{
    inputtextpaginate: ["pagina", "tipoorden", "columnaorden"],
    isAdministradorSistema: false,
    seleccionar: "",
	sedeid: ""
}

jsSedeDistribucion.Funcion =
{
    onLoad: function ()
    {
        jsCustom.item.jsObject = this;
        
        this.setTableIndex(0, "", "");
        
        $("#formSedeDistribucionBusqueda").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formSedeDistribucionBusqueda"));
        $("#formSedeDistribucionCreate").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formSedeDistribucionCreate"));
        $("#formSedeDistribucionEdit").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formSedeDistribucionEdit"));

        $("#formSedeDistribucionCreate_campanaid").select2({ placeholder: jsSedeDistribucion.variables.seleccionar + "...", allowClear: true, dropdownParent: $('#modalSedeDistribucionCreate'), width: '100%' });
        $("#formSedeDistribucionCreate_fuerzacomercialid").select2({ placeholder: jsSedeDistribucion.variables.seleccionar + "...", allowClear: true, dropdownParent: $('#modalSedeDistribucionCreate'), width: '100%' });
        $("#formSedeDistribucionEdit_campanaid").select2({ placeholder: jsSedeDistribucion.variables.seleccionar + "...", allowClear: true, dropdownParent: $('#modalSedeDistribucionEdit'), width: '100%' });
        $("#formSedeDistribucionEdit_fuerzacomercialid").select2({ placeholder: jsSedeDistribucion.variables.seleccionar + "...", allowClear: true, dropdownParent: $('#modalSedeDistribucionEdit'), width: '100%' });

        if (jsSedeDistribucion.variables.isAdministradorSistema)
            $("#formSedeDistribucionEdit_estado").select2({ placeholder: jsSedeDistribucion.variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true, dropdownParent: $('#modalSedeDistribucionEdit'), width: '100%' });
        
        this.setSearchAdvanced();
    },

    setTableIndex: function(nropaginas, tipoorden, columnaorden)
    {
        var columns = [{ "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": false } ];
        var isOrderJS = false;

        jsCustom.Funcion.setDataTable("tableSedeDistribucionIndex", columns, isOrderJS);
        jsCustom.Funcion.setOrderTable("tableSedeDistribucionIndex", isOrderJS, tipoorden, columnaorden);
    },

    setFormSubmit: function(form)
    {
    	$("#" + form + "sedeid").val(jsSedeDistribucion.variables.sedeid);

    	if (form == "formSedeDistribucionBusqueda")
		{
            jsCustom.Funcion.clearInputText(form, jsSedeDistribucion.variables.inputtextpaginate, "1");

			return true;
		}

        if (form == "formSedeDistribucionCreate" || form == "formSedeDistribucionEdit")
        {
            if ($("#" + form).valid())
            {
                var url = $("#" + form).attr("action");

                if (form == "formSedeDistribucionCreate")
                    url = url + "Valid";

                if (form == "formSedeDistribucionEdit")
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
		
        if (formId == "formSedeDistribucionBusqueda")
        {
            var html = jsCustom.Funcion.getValidateDefault(data.custom01, "");
            var nroPaginas = jsCustom.Funcion.getValidateDefault(data.custom02, "");
            var tipoOrden = jsCustom.Funcion.getValidateDefault(data.custom03, "");
            var columnaOrden = jsCustom.Funcion.getValidateDefault(data.custom04, "");
		
            if (html != "")
                $("#divSedeDistribucionListaBusqueda").html(html);
		
            jsCustom.Funcion.setValueHiddenforInputForm(formId);
		
            $("#" + formId + "_TipoOrden").val(tipoOrden);
            $("#" + formId + "_ColumnaOrden").val(columnaOrden);
            
            this.setTableIndex(nroPaginas, tipoOrden, columnaOrden);

			return;
        }

        if (formId == "formSedeDistribucionCreate" || formId == "formSedeDistribucionEdit")
        {
            $("#modalSedeDistribucionCreate").modal("hide");
            $("#modalSedeDistribucionEdit").modal("hide");

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
        var form = "formSedeDistribucionBusqueda";
        var inputtext = ["TipoOrden", "ColumnaOrden"];

        jsCustom.Funcion.clearInputText(form, inputtext, "");
        jsCustom.Funcion.clearInputText(form, jsSedeDistribucion.variables.inputtextpaginate, "1");

        $("#" + form + "_sedeid").val(jsSedeDistribucion.variables.sedeid);
		$("#" + form).submit();
    },

    setCustomModal: function(obj, custom)
    {
        if (custom == "create")
        {
            var form = "formSedeDistribucionCreate";

            $("#" + form + "_sedeid").val("");
            $("#" + form + "_campanaid").val("").trigger("change");
            $("#" + form + "_fuerzacomercialid").val("").trigger("change");
            $("#" + form + "_prioridad").val("");
            $("#" + form + "_porcentajedistribucion").val("");
            $("#" + form + "_descripcion").val("");

            return true;
        }

        return false;
    },

    setEntityItem: function(url, objBE)
    {
        if (url == "show")
        {
            var modalform = "dataSedeDistribucion";

            $("#" + modalform + "_campanaid").val(objBE.campaña.nombre);
            $("#" + modalform + "_fuerzacomercialid").val(objBE.fuerzacomercial.nombre);
            $("#" + modalform + "_prioridad").val(objBE.prioridad);
            $("#" + modalform + "_porcentajedistribucion").val(objBE.porcentajedistribucion);
            $("#" + modalform + "_descripcion").val(objBE.descripcion);
            $("#" + modalform + "_estado").val(objBE.estado.nombre);
            $("#" + modalform + "_fechamodificacion").val(jsCustom.Funcion.setFormatDateJSON(objBE.modificadopor.fecha, "ss"));
            $("#" + modalform + "_modificadopor").val(objBE.modificadopor.nombre);
            $("#" + modalform + "_fechacreacion").val(jsCustom.Funcion.setFormatDateJSON(objBE.creadopor.fecha, "ss"));
            $("#" + modalform + "_creadopor").val(objBE.creadopor.nombre);
			$("#SedeDistribucionShowName").html(objBE.nombre);

            $("#modalSedeDistribucionShow").modal("show");
        }

        if (url == "edit")
        {
            var form = "formSedeDistribucionEdit";

            $("#" + form + "_id").val(objBE.id);
            $("#" + form + "_sedeid").val(objBE.sede.id).trigger("change");
            $("#" + form + "_campanaid").val(objBE.campaña.id).trigger("change");
            $("#" + form + "_fuerzacomercialid").val(objBE.fuerzacomercial.id).trigger("change");
            $("#" + form + "_prioridad").val(objBE.prioridad);
            $("#" + form + "_porcentajedistribucion").val(objBE.porcentajedistribucion);
            $("#" + form + "_descripcion").val(objBE.descripcion);
            $("#" + form + "_estado").val(objBE.estado.codigo).trigger("change");
            $("#SedeDistribucionEditName").html(objBE.nombre);

            $("#modalSedeDistribucionEdit").modal("show");
        }
    }
    
};
