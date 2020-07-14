if (typeof (jsCampanaRetroalimentacion) == "undefined")
{
    jsCampanaRetroalimentacion = {};
}

jsCampanaRetroalimentacion =
{
    init: function ()
    {

        $("input[type='checkbox']").on('ifChecked', function (e)
        {
            e.preventDefault();

            var id = jsCustom.Funcion.getValidateDefault($(this).attr('id'), "");

            if (id == "formCampanaRetroalimentacionCreate_ingresarfoto" || id == "formCampanaRetroalimentacionEdit_ingresarfoto")
                jsCampanaRetroalimentacion.Funcion.setFoto(id.replace("_ingresarfoto", ""), true);
        });

        $("input[type='checkbox']").on('ifUnchecked', function (e)
        {
            e.preventDefault();

            var id = jsCustom.Funcion.getValidateDefault($(this).attr('id'), "");

            if (id == "formCampanaRetroalimentacionCreate_ingresarfoto" || id == "formCampanaRetroalimentacionEdit_ingresarfoto")
                jsCampanaRetroalimentacion.Funcion.setFoto(id.replace("_ingresarfoto", ""), false);
        });

        $(document).on("change", "#formCampanaRetroalimentacionCreate_tipoactividad", function (e)
        {
            try
            {
                e.preventDefault();
        
                $("#formCampanaRetroalimentacionCreate_categoriaactividad").empty();

                if ($(this).val() != "")
                    jsCustom.Funcion.setDLLJSON(jsCampanaRetroalimentacion.variables.urlListarCategoria, { campanaid: jsCampanaRetroalimentacion.variables.campanaid, tipoactividad: $(this).val() }, "#formCampanaRetroalimentacionCreate_categoriaactividad", true);
                
                $("#formCampanaRetroalimentacionCreate_categoriaactividad").val("").trigger("change");
            }
            catch (e)
            {
                jsCustom.Funcion.showMessage('formCampanaRetroalimentacionCreate_tipoactividad: ' + e.message);
            }
        });

    }
}

jsCampanaRetroalimentacion.variables =
{
    inputtextpaginate: ["pagina", "tipoorden", "columnaorden"],
    isAdministradorSistema: false,
    seleccionar: "",
    campanaid: "",
    urlListarCategoria: "",
}

jsCampanaRetroalimentacion.Funcion =
{
    onLoad: function ()
    {
        jsCustom.item.jsObject = this;

        iCheckMain.init();
        
        this.setTableIndex(0, "", "");

        $("#formCampanaRetroalimentacionCreate_tipoactividad").select2({ placeholder: jsCampanaRetroalimentacion.variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true, width: '100%' });
        $("#formCampanaRetroalimentacionCreate_categoriaactividad").select2({ placeholder: jsCampanaRetroalimentacion.variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true, width: '100%' });
        $("#formCampanaRetroalimentacionCreate_crearactividad").select2({ placeholder: jsCampanaRetroalimentacion.variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true, width: '100%' });
        $("#formCampanaRetroalimentacionCreate_etiquetagestionid").select2({ placeholder: jsCampanaRetroalimentacion.variables.seleccionar + "...", allowClear: true, width: '100%' });

        $("#formCampanaRetroalimentacionEdit_tipoactividad").select2({ placeholder: jsCampanaRetroalimentacion.variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true, width: '100%' });
        $("#formCampanaRetroalimentacionEdit_categoriaactividad").select2({ placeholder: jsCampanaRetroalimentacion.variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true, width: '100%' });
        $("#formCampanaRetroalimentacionEdit_crearactividad").select2({ placeholder: jsCampanaRetroalimentacion.variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true, width: '100%' });
        $("#formCampanaRetroalimentacionEdit_etiquetagestionid").select2({ placeholder: jsCampanaRetroalimentacion.variables.seleccionar + "...", allowClear: true, width: '100%' });

        $("#formCampanaRetroalimentacionBusqueda").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formCampanaRetroalimentacionBusqueda"));
        $("#formCampanaRetroalimentacionCreate").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formCampanaRetroalimentacionCreate"));
        $("#formCampanaRetroalimentacionEdit").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formCampanaRetroalimentacionEdit"));

        if (jsCampanaRetroalimentacion.variables.isAdministradorSistema)
            $("#formCampanaRetroalimentacionEdit_estado").select2({ placeholder: jsCampanaRetroalimentacion.variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true, width: '100%' });
        
        this.setSearchAdvanced();

        jsCampanaRetroalimentacion.init();
    },

    setTableIndex: function(nropaginas, tipoorden, columnaorden)
    {
        var columns = [{ "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": false } ];
        var isOrderJS = false;

        jsCustom.Funcion.setDataTable("tableCampanaRetroalimentacionIndex", columns, isOrderJS);
        jsCustom.Funcion.setOrderTable("tableCampanaRetroalimentacionIndex", isOrderJS, tipoorden, columnaorden);
    },

    setFormSubmit: function(form)
    {
        $("#" + form + "_campanaid").val(jsCampanaRetroalimentacion.variables.campanaid);

    	if (form == "formCampanaRetroalimentacionBusqueda")
		{
            jsCustom.Funcion.clearInputText(form, jsCampanaRetroalimentacion.variables.inputtextpaginate, "1");

			return true;
		}

        if (form == "formCampanaRetroalimentacionCreate" || form == "formCampanaRetroalimentacionEdit")
        {
            if ($("#" + form).valid())
            {
                var url = $("#" + form).attr("action");

                if (form == "formCampanaRetroalimentacionCreate")
                    url = url + "Valid";

                if (form == "formCampanaRetroalimentacionEdit")
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
		
        if (formId == "formCampanaRetroalimentacionBusqueda")
        {
            var html = jsCustom.Funcion.getValidateDefault(data.custom01, "");
            var nroPaginas = jsCustom.Funcion.getValidateDefault(data.custom02, "");
            var tipoOrden = jsCustom.Funcion.getValidateDefault(data.custom03, "");
            var columnaOrden = jsCustom.Funcion.getValidateDefault(data.custom04, "");
		
            if (html != "")
                $("#divCampanaRetroalimentacionListaBusqueda").html(html);
		
            jsCustom.Funcion.setValueHiddenforInputForm(formId);
		
            $("#" + formId + "_TipoOrden").val(tipoOrden);
            $("#" + formId + "_ColumnaOrden").val(columnaOrden);
            
            this.setTableIndex(nroPaginas, tipoOrden, columnaOrden);

			return;
        }

        if (formId == "formCampanaRetroalimentacionCreate" || formId == "formCampanaRetroalimentacionEdit")
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
        var form = "formCampanaRetroalimentacionBusqueda";
        var inputtext = ["TipoOrden", "ColumnaOrden"];

        jsCustom.Funcion.clearInputText(form, inputtext, "");
        jsCustom.Funcion.clearInputText(form, jsCampanaRetroalimentacion.variables.inputtextpaginate, "1");

        $("#" + form + "_campanaid").val(jsCampanaRetroalimentacion.variables.campanaid);

        $("#" + form).submit();
    },

    setCustomModal: function(obj, custom)
    {
        if (custom == "create")
        {
            var form = "formCampanaRetroalimentacionCreate";

            $("#" + form + "_orden").val("");
            $("#" + form + "_tipoactividad").val("").trigger("change");
            $("#" + form + "_categoriaactividad").val("").trigger("change");
            $("#" + form + "_etiquetagestionid").val("").trigger("change");
            $("#" + form + "_ingresarfecha").iCheck("uncheck").iCheck("update");
            $("#" + form + "_ingresarpromesa").iCheck("uncheck").iCheck("update");
            $("#" + form + "_validarcalendario").iCheck("uncheck").iCheck("update");
            $("#" + form + "_ingresarproducto").iCheck("uncheck").iCheck("update");
            $("#" + form + "_ingresarobservacion").iCheck("uncheck").iCheck("update");
            $("#" + form + "_ingresarfoto").iCheck("uncheck").iCheck("update");
            $("#" + form + "_numerominimofoto").val("");
            $("#" + form + "_numeromaximofoto").val("");
            $("#" + form + "_crearactividad").val("").trigger("change");
            $("#" + form + "_cerrractividad").iCheck("uncheck").iCheck("update");
            $("#" + form + "_descripcion").val("");

            this.setFoto(form, false);            

            return true;
        }

        return false;
    },

    setEntityItem: function(url, objBE)
    {
        if (url == "show")
        {
            var modalform = "dataCampanaRetroalimentacion";

            $("#" + modalform + "_orden").val(objBE.orden);
            $("#" + modalform + "_tipoactividad").val(objBE.tipoactividad.nombre);
            $("#" + modalform + "_categoriaactividad").val(objBE.categoriaactividad.nombre);
            $("#" + modalform + "_etiquetagestionid").val(objBE.etiquetagestion.nombre);
            $("#" + modalform + "_ingresarfecha").iCheck(objBE.ingresarfecha ? "check" : "uncheck").iCheck("update");
            $("#" + modalform + "_ingresarpromesa").iCheck(objBE.ingresarpromesa ? "check" : "uncheck").iCheck("update");
            $("#" + modalform + "_validarcalendario").iCheck(objBE.validarcalendario ? "check" : "uncheck").iCheck("update");
            $("#" + modalform + "_ingresarproducto").iCheck(objBE.ingresarproducto ? "check" : "uncheck").iCheck("update");
            $("#" + modalform + "_ingresarobservacion").iCheck(objBE.ingresarobservacion ? "check" : "uncheck").iCheck("update");
            $("#" + modalform + "_ingresarfoto").iCheck(objBE.ingresarfoto ? "check" : "uncheck").iCheck("update");
            $("#" + modalform + "_numerominimofoto").val(objBE.numerominimofoto);
            $("#" + modalform + "_numeromaximofoto").val(objBE.numeromaximofoto);
            $("#" + modalform + "_crearactividad").val(objBE.crearactividad.nombre);
            $("#" + modalform + "_cerraractividad").iCheck(objBE.cerraractividad ? "check" : "uncheck").iCheck("update");
            $("#" + modalform + "_descripcion").val(objBE.descripcion);
            $("#" + modalform + "_estado").val(objBE.estado.nombre);
            $("#" + modalform + "_fechamodificacion").val(jsCustom.Funcion.setFormatDateJSON(objBE.modificadopor.fecha, "ss"));
            $("#" + modalform + "_modificadopor").val(objBE.modificadopor.nombre);
            $("#" + modalform + "_fechacreacion").val(jsCustom.Funcion.setFormatDateJSON(objBE.creadopor.fecha, "ss"));
            $("#" + modalform + "_creadopor").val(objBE.creadopor.nombre);
			$("#CampanaRetroalimentacionShowName").html(objBE.nombre);

            $("#modalCampanaRetroalimentacionShow").modal("show");
        }

        if (url == "edit")
        {
            var form = "formCampanaRetroalimentacionEdit";

            $("#" + form + "_id").val(objBE.id);
            $("#" + form + "_orden").val(objBE.orden);
            $("#" + form + "_tipoactividad").val(objBE.tipoactividad.codigo).trigger("change");
            $("#" + form + "_categoriaactividad").val(objBE.categoriaactividad.codigo).trigger("change");
            $("#" + form + "_etiquetagestionid").val(objBE.etiquetagestion.id).trigger("change");
            $("#" + form + "_ingresarfecha").iCheck(objBE.ingresarfecha ? "check" : "uncheck").iCheck("update");
            $("#" + form + "_ingresarpromesa").iCheck(objBE.ingresarpromesa ? "check" : "uncheck").iCheck("update");
            $("#" + form + "_validarcalendario").iCheck(objBE.validarcalendario ? "check" : "uncheck").iCheck("update");
            $("#" + form + "_ingresarproducto").iCheck(objBE.ingresarproducto ? "check" : "uncheck").iCheck("update");
            $("#" + form + "_ingresarobservacion").iCheck(objBE.ingresarobservacion ? "check" : "uncheck").iCheck("update");
            $("#" + form + "_ingresarfoto").iCheck(objBE.ingresarfoto ? "check" : "uncheck").iCheck("update");
            $("#" + form + "_numerominimofoto").val(objBE.numerominimofoto);
            $("#" + form + "_numeromaximofoto").val(objBE.numeromaximofoto);
            $("#" + form + "_crearactividad").val(objBE.crearactividad.codigo).trigger("change");
            $("#" + form + "_cerraractividad").iCheck(objBE.cerraractividad ? "check" : "uncheck").iCheck("update");
            $("#" + form + "_descripcion").val(objBE.descripcion);
            $("#" + form + "_estado").val(objBE.estado.codigo).trigger("change");
            $("#CampanaRetroalimentacionEditName").html(objBE.nombre);

            this.setFoto(form, objBE.ingresarfoto);

            $("#modalCampanaRetroalimentacionEdit").modal("show");
        }
    },

    setFoto: function (form, isCheck)
    {
        if (isCheck)
        {
            $("#" + form + "_numerominimofoto").removeAttr('readonly');
            $("#" + form + "_numeromaximofoto").removeAttr('readonly');
        }
        else
        {
            $("#" + form + "_numerominimofoto").val("");
            $("#" + form + "_numeromaximofoto").val("");
            $("#" + form + "_numerominimofoto").attr('readonly', 'readonly');
            $("#" + form + "_numeromaximofoto").attr('readonly', 'readonly');
        }
        
    }
    
};
