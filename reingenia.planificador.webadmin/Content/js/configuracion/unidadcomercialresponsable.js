if (typeof (jsUnidadComercialResponsable) == "undefined")
{
    jsUnidadComercialResponsable = {};
}

jsUnidadComercialResponsable.variables =
{
    inputtextpaginate: ["pagina", "tipoorden", "columnaorden"],
    isAdministradorSistema: false,
    seleccionar: "",
    unidadcomercialid: "",
    jsUnidadComercial: null,
    titleEnabled: "",
    messageEnabled: "",
    form: "",
    isShow: false,
};

jsUnidadComercialResponsable.Funcion =
{
    onLoad: function ()
    {
        jsCustom.item.jsObject = this;
        
        this.setTableIndex(0, "", "");
        
        $("#formUnidadComercialResponsableBusqueda").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formUnidadComercialResponsableBusqueda"));
        $("#formUnidadComercialResponsableCreate").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formUnidadComercialResponsableCreate"));

        jsUnidadComercialResponsable.variables.form = "Create";

        $("#formUnidadComercialResponsable" + jsUnidadComercialResponsable.variables.form + "_responsableid").select2({ placeholder: jsUnidadComercialResponsable.variables.seleccionar + "...", allowClear: true });

        jsUnidadComercialResponsable.variables.jsUnidadComercial = jsUnidadComercial.Funcion;

        this.setSearchAdvanced();
    },

    onLoadShow: function ()
    {
        this.setTableIndex(0, "", "");

        $("#formUnidadComercialResponsableBusqueda").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formUnidadComercialResponsableBusqueda"));

        this.setSearchAdvanced();
    },

    setTableIndex: function(nropaginas, tipoorden, columnaorden)
    {
        var columns = [{ "bSortable": true }, { "bSortable": true }, { "bSortable": false } ];
        var isOrderJS = false;

        jsCustom.Funcion.setDataTable("tableUnidadComercialResponsableIndex", columns, isOrderJS);
        jsCustom.Funcion.setOrderTable("tableUnidadComercialResponsableIndex", isOrderJS, tipoorden, columnaorden);
    },

    setFormSubmit: function(form)
    {
    	$("#" + form + "_unidadcomercialid").val(jsUnidadComercialResponsable.variables.unidadcomercialid);

    	if (form == "formUnidadComercialResponsableBusqueda")
		{
            jsCustom.Funcion.clearInputText(form, jsUnidadComercialResponsable.variables.inputtextpaginate, "1");

			return true;
		}

        if (form == "formUnidadComercialResponsableCreate")
        {
            if ($("#" + form).valid())
            {
                var url = $("#" + form).attr("action");

                if (form == "formUnidadComercialResponsableCreate")
                    url = url + "Valid";

                var data = $("#" + form).serialize();
                var isOK = jsCustom.Funcion.getValidSave(url, data);

                return isOK;
            }
        }

        if (form == "formUnidadComercialEdit")
            return jsUnidadComercialResponsable.variables.jsUnidadComercial.setFormSubmit(form);

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
		
        if (formId == "formUnidadComercialResponsableBusqueda")
        {
            var html = jsCustom.Funcion.getValidateDefault(data.custom01, "");
            var nroPaginas = jsCustom.Funcion.getValidateDefault(data.custom02, "");
            var tipoOrden = jsCustom.Funcion.getValidateDefault(data.custom03, "");
            var columnaOrden = jsCustom.Funcion.getValidateDefault(data.custom04, "");
		
            if (html != "")
                $("#divUnidadComercialResponsableListaBusqueda").html(html);
		
            jsCustom.Funcion.setValueHiddenforInputForm(formId);
		
            $("#" + formId + "_TipoOrden").val(tipoOrden);
            $("#" + formId + "_ColumnaOrden").val(columnaOrden);
            
            this.setTableIndex(nroPaginas, tipoOrden, columnaOrden);

            if (jsUnidadComercialResponsable.variables.isShow)
                $('#tableUnidadComercialResponsableIndex th:nth-child(3), #tableUnidadComercialResponsableIndex td:nth-child(3)').remove();

			return;
        }

        if (formId == "formUnidadComercialResponsableCreate")
        {
            $("#" + formId + "_responsableid").val("").trigger("change");

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
        var form = "formUnidadComercialResponsableBusqueda";
        var inputtext = ["TipoOrden", "ColumnaOrden"];

        jsCustom.Funcion.clearInputText(form, inputtext, "");
        jsCustom.Funcion.clearInputText(form, jsUnidadComercialResponsable.variables.inputtextpaginate, "1");

        $("#" + form + "_unidadcomercialid").val(jsUnidadComercialResponsable.variables.unidadcomercialid);
        $("#" + form).submit();
    },

    setRefresh: function (obj, div)
    {
        if (div == "UnidadComercialResponsable")
            this.setSearchAdvanced();
    },

    setMessage: function (custom, item)
    {
        if (custom == "enabled")
        {
            item.title = jsUnidadComercialResponsable.variables.titleEnabled;
            item.message = jsUnidadComercialResponsable.variables.messageEnabled;
        }

        return item;
    }
    
};
