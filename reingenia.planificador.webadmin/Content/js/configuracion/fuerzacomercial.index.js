if (typeof (jsFuerzaComercial) == "undefined")
{
    jsFuerzaComercial = {};
}

jsFuerzaComercial.variables =
{
    inputtextpaginate: ["pagina", "tipoorden", "columnaorden"]
}

jsFuerzaComercial.Funcion =
{
    onLoadIndex: function ()
    {
        jsCustom.item.jsObject = this;
        
        this.setTableIndex(0, "", "");
        
        $("#formFuerzaComercialBusqueda").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formFuerzaComercialBusqueda"));

        this.setSearchAdvanced();
    },

    setTableIndex: function(nropaginas, tipoorden, columnaorden)
    {
        var columns = [{ "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": false } ];
        var isOrderJS = false;

        jsCustom.Funcion.setDataTable("tableFuerzaComercialIndex", columns, isOrderJS);
        jsCustom.Funcion.setOrderTable("tableFuerzaComercialIndex", isOrderJS, tipoorden, columnaorden);
    },

    setFormSubmit: function(form)
    {
    	if (form == "formFuerzaComercialBusqueda")
            jsCustom.Funcion.clearInputText(form, jsFuerzaComercial.variables.inputtextpaginate, "1");

        return true;
    },

    successForm: function(formId, data)
    {
        var error = jsCustom.Funcion.getValidateDefault(data.isError, "");

        if (error == "S")
        {
            jsCustom.Funcion.showMessage(jsCustom.Funcion.getValidateDefault(data.message, ""));

            return;
        }

        if (formId == "formFuerzaComercialBusqueda")
        {
            var html = jsCustom.Funcion.getValidateDefault(data.custom01, "");
            var nroPaginas = jsCustom.Funcion.getValidateDefault(data.custom02, "");
            var tipoOrden = jsCustom.Funcion.getValidateDefault(data.custom03, "");
            var columnaOrden = jsCustom.Funcion.getValidateDefault(data.custom04, "");

            if (html != "")
                $("#divFuerzaComercialListaBusqueda").html(html);

            jsCustom.Funcion.setValueHiddenforInputForm(formId);

            $("#" + formId + "_TipoOrden").val(tipoOrden);
            $("#" + formId + "_ColumnaOrden").val(columnaOrden);
            
            this.setTableIndex(nroPaginas, tipoOrden, columnaOrden);
            
            if (formId == "formFuerzaComercialBusqueda")
                $("#modalFuerzaComercialSearch").modal("hide");
        }
    },

    setDeleteItem: function(custom)
    {
        if (custom == "disabled" || custom == "delete")
            this.setSearchAdvanced();
    },

    setSearchAdvanced: function()
    {
        var form = "formFuerzaComercialBusqueda";
        var inputtext = ["TipoOrden", "ColumnaOrden"];

        jsCustom.Funcion.clearInputText(form, inputtext, "");
        jsCustom.Funcion.clearInputText(form, jsFuerzaComercial.variables.inputtextpaginate, "1");

        $("#" + form + "_columnaorden").val("2");
        $("#" + form + "_ColumnaOrden").val("2");

        $("#" + form).submit();
    }
    
};
