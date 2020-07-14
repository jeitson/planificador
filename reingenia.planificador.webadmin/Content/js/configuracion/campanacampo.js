if (typeof (jsCampanaCampo) == "undefined")
{
    jsCampanaCampo = {};
}

jsCampanaCampo.variables =
{
    inputtextpaginate: ["pagina", "tipoorden", "columnaorden"],
    isAdministradorSistema: false,
    seleccionar: "",
    campanaid: "",
}

jsCampanaCampo.Funcion =
{
    onLoad: function ()
    {
        jsCustom.item.jsObject = this;
        
        this.setTableIndex(0, "", "");

        $("#formCampanaCampoCreate_tipoinformacion").select2({ placeholder: jsCampanaCampo.variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true, width: '100%' });

        $("#formCampanaCampoEdit_tipoinformacion").select2({ placeholder: jsCampanaCampo.variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true, width: '100%' });

        $("#formCampanaCampoBusqueda").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formCampanaCampoBusqueda"));
        $("#formCampanaCampoCreate").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formCampanaCampoCreate"));
        $("#formCampanaCampoEdit").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formCampanaCampoEdit"));

        if (jsCampanaCampo.variables.isAdministradorSistema)
            $("#formCampanaCampoEdit_estado").select2({ placeholder: jsCampanaCampo.variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true, width: '100%' });

        this.setBoolICheck("formCampanaCampoCreate", "esllave");
        this.setBoolICheck("formCampanaCampoEdit", "esllave");
        this.setBoolICheck("dataCampanaCampo", "esllave");

        this.setSearchAdvanced();
    },

    setTableIndex: function(nropaginas, tipoorden, columnaorden)
    {
        var columns = [{ "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": false } ];
        var isOrderJS = false;

        jsCustom.Funcion.setDataTable("tableCampanaCampoIndex", columns, isOrderJS);
        jsCustom.Funcion.setOrderTable("tableCampanaCampoIndex", isOrderJS, tipoorden, columnaorden);
    },

    setFormSubmit: function(form)
    {
        $("#" + form + "_campanaid").val(jsCampanaCampo.variables.campanaid);

    	if (form == "formCampanaCampoBusqueda")
		{
            jsCustom.Funcion.clearInputText(form, jsCampanaCampo.variables.inputtextpaginate, "1");

			return true;
		}

        if (form == "formCampanaCampoCreate" || form == "formCampanaCampoEdit")
        {
            if ($("#" + form).valid())
            {
                var url = $("#" + form).attr("action");

                if (form == "formCampanaCampoCreate")
                    url = url + "Valid";

                if (form == "formCampanaCampoEdit")
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
		
        if (formId == "formCampanaCampoBusqueda")
        {
            var html = jsCustom.Funcion.getValidateDefault(data.custom01, "");
            var nroPaginas = jsCustom.Funcion.getValidateDefault(data.custom02, "");
            var tipoOrden = jsCustom.Funcion.getValidateDefault(data.custom03, "");
            var columnaOrden = jsCustom.Funcion.getValidateDefault(data.custom04, "");
		
            if (html != "")
                $("#divCampanaCampoListaBusqueda").html(html);
		
            jsCustom.Funcion.setValueHiddenforInputForm(formId);
		
            $("#" + formId + "_TipoOrden").val(tipoOrden);
            $("#" + formId + "_ColumnaOrden").val(columnaOrden);
            
            this.setTableIndex(nroPaginas, tipoOrden, columnaOrden);

			return;
        }

        if (formId == "formCampanaCampoCreate" || formId == "formCampanaCampoEdit")
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
        var form = "formCampanaCampoBusqueda";
        var inputtext = ["TipoOrden", "ColumnaOrden"];

        jsCustom.Funcion.clearInputText(form, inputtext, "");
        jsCustom.Funcion.clearInputText(form, jsCampanaCampo.variables.inputtextpaginate, "1");

        $("#" + form + "_campanaid").val(jsCampanaCampo.variables.campanaid);

        $("#" + form).submit();
    },

    setCustomModal: function(obj, custom)
    {
        if (custom == "create")
        {
            var form = "formCampanaCampoCreate";

            $("#" + form + "_orden").val("");
            $("#" + form + "_esllave_no").iCheck('check');
            $("#" + form + "_ancho").val("");
            $("#" + form + "_tipoinformacion").val("").trigger("change");
            $("#" + form + "_titulo").val("");
            $("#" + form + "_campoorigen").val("");
            $("#" + form + "_descripcion").val("");

            return true;
        }

        return false;
    },

    setEntityItem: function(url, objBE)
    {
        if (url == "show")
        {
            var modalform = "dataCampanaCampo";

            $("#" + modalform + "_orden").val(objBE.orden);
            $("#" + modalform + "_ancho").val(objBE.ancho);
            $("#" + modalform + "_tipoinformacion").val(objBE.tipoinformacion.nombre);
            $("#" + modalform + "_titulo").val(objBE.titulo);
            $("#" + modalform + "_campoorigen").val(objBE.campoorigen);
            $("#" + modalform + "_descripcion").val(objBE.descripcion);
            $("#" + modalform + "_estado").val(objBE.estado.nombre);
            $("#" + modalform + "_fechamodificacion").val(jsCustom.Funcion.setFormatDateJSON(objBE.modificadopor.fecha, "ss"));
            $("#" + modalform + "_modificadopor").val(objBE.modificadopor.nombre);
            $("#" + modalform + "_fechacreacion").val(jsCustom.Funcion.setFormatDateJSON(objBE.creadopor.fecha, "ss"));
            $("#" + modalform + "_creadopor").val(objBE.creadopor.nombre);

            if (objBE.esllave)
                $("#" + modalform + "_esllave_si").iCheck('check');
            else
                $("#" + modalform + "_esllave_no").iCheck('check');

			$("#CampanaCampoShowName").html(objBE.nombre);

            $("#modalCampanaCampoShow").modal("show");
        }

        if (url == "edit")
        {
            var form = "formCampanaCampoEdit";
            
            $("#" + form + "_id").val(objBE.id);
            $("#" + form + "_orden").val(objBE.orden);
            $("#" + form + "_ancho").val(objBE.ancho);
            $("#" + form + "_tipoinformacion").val(objBE.tipoinformacion.codigo).trigger("change");
            $("#" + form + "_campoorigen").val(objBE.campoorigen);
            $("#" + form + "_titulo").val(objBE.titulo);
            $("#" + form + "_descripcion").val(objBE.descripcion);
            $("#" + form + "_estado").val(objBE.estado.codigo).trigger("change");

            if (objBE.esllave)
                $("#" + form + "_esllave_si").iCheck('check');
            else
                $("#" + form + "_esllave_no").iCheck('check');

            $("#CampanaCampoEditName").html(objBE.nombre);

            $("#modalCampanaCampoEdit").modal("show");
        }
    },

    setBoolICheck: function (form, field)
    {
        $("#" + form + "_" + field + "_no").iCheck({ checkboxClass: 'icheckbox_square-green', radioClass: 'iradio_square-green', increaseArea: "10%" }).on('ifChecked', function (e) {
            var isChecked = e.currentTarget.checked;

            if (isChecked == true)
                $("#" + form + "_" + field).val("0");
        });

        $("#" + form + "_" + field + "_si").iCheck({ checkboxClass: 'icheckbox_square-green', radioClass: 'iradio_square-green', increaseArea: "10%" }).on('ifChecked', function (e) {
            var isChecked = e.currentTarget.checked;

            if (isChecked == true)
                $("#" + form + "_" + field).val("1");
        });

        if (jsCustom.Funcion.getValidateDefault($("#" + form + "_" + field).val(), "0") == "1")
            $("#" + form + "_" + field + "_si").iCheck('check');
        else
            $("#" + form + "_" + field + "_no").iCheck('check');
    },
    
};
