if (typeof (jsZonaGestion) == "undefined")
{
    jsZonaGestion = {};
}

jsZonaGestion.variables =
{
    inputtextpaginate: ["pagina", "tipoorden", "columnaorden"]
}

jsZonaGestion.Funcion =
{
    onLoadIndex: function ()
    {
        jsCustom.item.jsObject = this;
        
        this.setTableIndex(0, "", "");
        
        $("#formZonaGestionBusqueda").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formZonaGestionBusqueda"));

        this.setSearchAdvanced();
    },

    setTableIndex: function(nropaginas, tipoorden, columnaorden)
    {
        var columns = [{ "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": false } ];
        var isOrderJS = false;

        jsCustom.Funcion.setDataTable("tableZonaGestionIndex", columns, isOrderJS);
        jsCustom.Funcion.setOrderTable("tableZonaGestionIndex", isOrderJS, tipoorden, columnaorden);
    },

    setFormSubmit: function(form)
    {
    	if (form == "formZonaGestionBusqueda")
            jsCustom.Funcion.clearInputText(form, jsZonaGestion.variables.inputtextpaginate, "1");

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

        if (formId == "formZonaGestionBusqueda")
        {
            var html = jsCustom.Funcion.getValidateDefault(data.custom01, "");
            var nroPaginas = jsCustom.Funcion.getValidateDefault(data.custom02, "");
            var tipoOrden = jsCustom.Funcion.getValidateDefault(data.custom03, "");
            var columnaOrden = jsCustom.Funcion.getValidateDefault(data.custom04, "");

            if (html != "")
                $("#divZonaGestionListaBusqueda").html(html);

            jsCustom.Funcion.setValueHiddenforInputForm(formId);

            $("#" + formId + "_TipoOrden").val(tipoOrden);
            $("#" + formId + "_ColumnaOrden").val(columnaOrden);
            
            this.setTableIndex(nroPaginas, tipoOrden, columnaOrden);
            
            if (formId == "formZonaGestionBusqueda")
                $("#modalZonaGestionSearch").modal("hide");
        }
    },

    setDeleteItem: function(custom)
    {
        if (custom == "disabled" || custom == "delete")
            $(".btnPagination").trigger("click");
    },

    setSearchAdvanced: function()
    {
        var form = "formZonaGestionBusqueda";
        var inputtext = ["TipoOrden", "ColumnaOrden"];

        jsCustom.Funcion.clearInputText(form, inputtext, "");
        jsCustom.Funcion.clearInputText(form, jsZonaGestion.variables.inputtextpaginate, "1");

        $("#" + form + "_columnaorden").val("3");
        $("#" + form + "_ColumnaOrden").val("3");

        $("#" + form).submit();
    }
    
};
