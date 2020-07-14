if (typeof (jsAsesorCalendario) == "undefined")
{
    jsAsesorCalendario = {};
}

jsAsesorCalendario.variables =
{
    inputtextpaginate: ["pagina", "tipoorden", "columnaorden"],
    isAdministradorSistema: false,
    seleccionar: "",
    asesorid: "",
    sedeid: ""
}

jsAsesorCalendario.Funcion =
{
    onLoad: function ()
    {
        jsCustom.item.jsObject = this;

        iCheckMain.init();
        
        this.setTableIndex(0, "", "");
        
        $("#formAsesorCalendarioBusqueda").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formAsesorCalendarioBusqueda"));
        $("#formAsesorCalendarioCreate").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formAsesorCalendarioCreate"));
        $("#formAsesorCalendarioEdit").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formAsesorCalendarioEdit"));

        $("#formAsesorCalendarioCreate_sedezonagestionid").select2({ placeholder: jsAsesorCalendario.variables.seleccionar + "...", allowClear: true, dropdownParent: $('#modalAsesorCalendarioCreate'), width: '100%' });
        $("#formAsesorCalendarioCreate_tipoactividad").select2({ placeholder: jsAsesorCalendario.variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true, dropdownParent: $('#modalAsesorCalendarioCreate'), width: '100%' });

        $("#formAsesorCalendarioEdit_sedezonagestionid").select2({ placeholder: jsAsesorCalendario.variables.seleccionar + "...", allowClear: true, dropdownParent: $('#modalAsesorCalendarioEdit'), width: '100%' });
        $("#formAsesorCalendarioEdit_tipoactividad").select2({ placeholder: jsAsesorCalendario.variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true, dropdownParent: $('#modalAsesorCalendarioEdit'), width: '100%' });

        if (jsAsesorCalendario.variables.isAdministradorSistema)
            $("#formAsesorCalendarioEdit_estado").select2({ placeholder: jsAsesorCalendario.variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true, dropdownParent: $('#modalAsesorCalendarioEdit'), width: '100%' });
        
        this.setSearchAdvanced();
    },

    setTableIndex: function(nropaginas, tipoorden, columnaorden)
    {
        var columns = [{ "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": false } ];
        var isOrderJS = false;

        jsCustom.Funcion.setDataTable("tableAsesorCalendarioIndex", columns, isOrderJS);
        jsCustom.Funcion.setOrderTable("tableAsesorCalendarioIndex", isOrderJS, tipoorden, columnaorden);
    },

    setFormSubmit: function(form)
    {
    	$("#" + form + "asesorid").val(jsAsesorCalendario.variables.asesorid);

    	if (form == "formAsesorCalendarioBusqueda")
        {
            $("#" + form + "sedeid").val(jsAsesorCalendario.variables.sedeid);

            jsCustom.Funcion.clearInputText(form, jsAsesorCalendario.variables.inputtextpaginate, "1");

			return true;
		}

        if (form == "formAsesorCalendarioCreate" || form == "formAsesorCalendarioEdit")
        {
            if ($("#" + form).valid())
            {
                var url = $("#" + form).attr("action");

                if (form == "formAsesorCalendarioCreate")
                    url = url + "Valid";

                if (form == "formAsesorCalendarioEdit")
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
		
        if (formId == "formAsesorCalendarioBusqueda")
        {
            var html = jsCustom.Funcion.getValidateDefault(data.custom01, "");
            var nroPaginas = jsCustom.Funcion.getValidateDefault(data.custom02, "");
            var tipoOrden = jsCustom.Funcion.getValidateDefault(data.custom03, "");
            var columnaOrden = jsCustom.Funcion.getValidateDefault(data.custom04, "");
		
            if (html != "")
                $("#divAsesorCalendarioListaBusqueda").html(html);
		
            jsCustom.Funcion.setValueHiddenforInputForm(formId);
		
            $("#" + formId + "_TipoOrden").val(tipoOrden);
            $("#" + formId + "_ColumnaOrden").val(columnaOrden);
            
            this.setTableIndex(nroPaginas, tipoOrden, columnaOrden);

			return;
        }

        if (formId == "formAsesorCalendarioCreate" || formId == "formAsesorCalendarioEdit")
        {
            $("#modalAsesorCalendarioCreate").modal("hide");
            $("#modalAsesorCalendarioEdit").modal("hide");

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
        var form = "formAsesorCalendarioBusqueda";
        var inputtext = ["TipoOrden", "ColumnaOrden"];

        jsCustom.Funcion.clearInputText(form, inputtext, "");
        jsCustom.Funcion.clearInputText(form, jsAsesorCalendario.variables.inputtextpaginate, "1");

        $("#" + form + "_asesorid").val(jsAsesorCalendario.variables.asesorid);
        $("#" + form + "_sedeid").val(jsAsesorCalendario.variables.sedeid);
		$("#" + form).submit();
    },

    setCustomModal: function(obj, custom)
    {
        if (custom == "create")
        {
            var form = "formAsesorCalendarioCreate";

            $("#" + form + "_asesorid").val("");
            $("#" + form + "_sedezonagestionid").val("").trigger("change");
            $("#" + form + "_tipoactividad").val("").trigger("change");
            $("#" + form + "_lunes").iCheck("uncheck").iCheck("update");
            $("#" + form + "_martes").iCheck("uncheck").iCheck("update");
            $("#" + form + "_miercoles").iCheck("uncheck").iCheck("update");
            $("#" + form + "_jueves").iCheck("uncheck").iCheck("update");
            $("#" + form + "_viernes").iCheck("uncheck").iCheck("update");
            $("#" + form + "_sabado").iCheck("uncheck").iCheck("update");
            $("#" + form + "_domingo").iCheck("uncheck").iCheck("update");
            $("#" + form + "_descripcion").iCheck("uncheck").iCheck("update");

            return true;
        }

        return false;
    },

    setEntityItem: function(url, objBE)
    {
        if (url == "show")
        {
            var modalform = "dataAsesorCalendario";

            $("#" + modalform + "_asesorid").val(objBE.asesor.nombre);
            $("#" + modalform + "_sedezonagestionid").val(objBE.sedezonagestion.nombre);
            $("#" + modalform + "_tipoactividad").val(objBE.tipoactividad.nombre);
            $("#" + modalform + "_lunes").iCheck(objBE.lunes ? "check" : "uncheck").iCheck("update");
            $("#" + modalform + "_martes").iCheck(objBE.martes ? "check" : "uncheck").iCheck("update");;
            $("#" + modalform + "_miercoles").iCheck(objBE.miercoles ? "check" : "uncheck").iCheck("update");;
            $("#" + modalform + "_jueves").iCheck(objBE.jueves ? "check" : "uncheck").iCheck("update");;
            $("#" + modalform + "_viernes").iCheck(objBE.viernes ? "check" : "uncheck").iCheck("update");;
            $("#" + modalform + "_sabado").iCheck(objBE.sabado ? "check" : "uncheck").iCheck("update");;
            $("#" + modalform + "_domingo").iCheck(objBE.domingo ? "check" : "uncheck").iCheck("update");;
            $("#" + modalform + "_descripcion").val(objBE.descripcion);
            $("#" + modalform + "_estado").val(objBE.estado.nombre);
            $("#" + modalform + "_fechamodificacion").val(jsCustom.Funcion.setFormatDateJSON(objBE.modificadopor.fecha, "ss"));
            $("#" + modalform + "_modificadopor").val(objBE.modificadopor.nombre);
            $("#" + modalform + "_fechacreacion").val(jsCustom.Funcion.setFormatDateJSON(objBE.creadopor.fecha, "ss"));
            $("#" + modalform + "_creadopor").val(objBE.creadopor.nombre);
			$("#AsesorCalendarioShowName").html(objBE.nombre);

            $("#modalAsesorCalendarioShow").modal("show");
        }

        if (url == "edit")
        {
            var form = "formAsesorCalendarioEdit";

            $("#" + form + "_asesorid").val(objBE.asesor.id);
            $("#" + form + "_sedezonagestionid").val(objBE.sedezonagestion.id).trigger("change");
            $("#" + form + "_tipoactividad").val(objBE.tipoactividad.codigo).trigger("change");
            $("#" + form + "_lunes").iCheck(objBE.lunes ? "check" : "uncheck").iCheck("update");
            $("#" + form + "_martes").iCheck(objBE.martes ? "check" : "uncheck").iCheck("update");
            $("#" + form + "_miercoles").iCheck(objBE.miercoles ? "check" : "uncheck").iCheck("update");
            $("#" + form + "_jueves").iCheck(objBE.jueves ? "check" : "uncheck").iCheck("update");
            $("#" + form + "_viernes").iCheck(objBE.viernes ? "check" : "uncheck").iCheck("update");
            $("#" + form + "_sabado").iCheck(objBE.sabado ? "check" : "uncheck").iCheck("update");
            $("#" + form + "_domingo").iCheck(objBE.domingo ? "check" : "uncheck").iCheck("update");
            $("#" + form + "_descripcion").val(objBE.descripcion);
            $("#" + form + "_estado").val(objBE.estado.codigo).trigger("change");
            $("#" + form + "_id").val(objBE.id);
            $("#AsesorCalendarioEditName").html(objBE.nombre);

            $("#modalAsesorCalendarioEdit").modal("show");
        }
    }
    
};
