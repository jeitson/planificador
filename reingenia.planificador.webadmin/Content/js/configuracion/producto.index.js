﻿if (typeof (jsProducto) == "undefined")
{
    jsProducto = {};
}

jsProducto.variables =
{
    inputtextpaginate: ["pagina", "tipoorden", "columnaorden"]
}

jsProducto.Funcion =
{
    onLoadIndex: function ()
    {
        jsCustom.item.jsObject = this;
        
        this.setTableIndex(0, "", "");
        
        $("#formProductoBusqueda").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formProductoBusqueda"));

        this.setSearchAdvanced();
    },

    setTableIndex: function(nropaginas, tipoorden, columnaorden)
    {
        var columns = [{ "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": false } ];
        var isOrderJS = false;

        jsCustom.Funcion.setDataTable("tableProductoIndex", columns, isOrderJS);
        jsCustom.Funcion.setOrderTable("tableProductoIndex", isOrderJS, tipoorden, columnaorden);
    },

    setFormSubmit: function(form)
    {
    	if (form == "formProductoBusqueda")
            jsCustom.Funcion.clearInputText(form, jsProducto.variables.inputtextpaginate, "1");

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

        if (formId == "formProductoBusqueda")
        {
            var html = jsCustom.Funcion.getValidateDefault(data.custom01, "");
            var nroPaginas = jsCustom.Funcion.getValidateDefault(data.custom02, "");
            var tipoOrden = jsCustom.Funcion.getValidateDefault(data.custom03, "");
            var columnaOrden = jsCustom.Funcion.getValidateDefault(data.custom04, "");

            if (html != "")
                $("#divProductoListaBusqueda").html(html);

            jsCustom.Funcion.setValueHiddenforInputForm(formId);

            $("#" + formId + "_TipoOrden").val(tipoOrden);
            $("#" + formId + "_ColumnaOrden").val(columnaOrden);
            
            this.setTableIndex(nroPaginas, tipoOrden, columnaOrden);
            
            if (formId == "formProductoBusqueda")
                $("#modalProductoSearch").modal("hide");
        }
    },

    setDeleteItem: function(custom)
    {
        if (custom == "disabled" || custom == "delete")
            $(".btnPagination").trigger("click");
    },

    setSearchAdvanced: function()
    {
        var form = "formProductoBusqueda";
        var inputtext = ["TipoOrden", "ColumnaOrden"];

        jsCustom.Funcion.clearInputText(form, inputtext, "");
        jsCustom.Funcion.clearInputText(form, jsProducto.variables.inputtextpaginate, "1");

        $("#" + form + "_columnaorden").val("3");
        $("#" + form + "_ColumnaOrden").val("3");

        $("#" + form).submit();
    }
    
};
