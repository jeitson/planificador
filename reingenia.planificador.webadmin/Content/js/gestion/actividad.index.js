if (typeof (jsActividad) == "undefined")
{
    jsActividad = {};
}

jsActividad.variables =
{
    inputtextpaginate: ["pagina", "tipoorden", "columnaorden"],
}

jsActividad.Funcion =
{
    onLoadIndex: function ()
    {
        jsCustom.item.jsObject = this;

        this.setTableIndex(0, "", "");

        $("#formActividadBusqueda").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formActividadBusqueda"));

        this.setSearchAdvanced();
    },

    setTableIndex: function(nropaginas, tipoorden, columnaorden)
    {
        var columns = [{ "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": false } ];
        var isOrderJS = false;

        jsCustom.Funcion.setDataTable("tableActividadIndex", columns, isOrderJS);
        jsCustom.Funcion.setOrderTable("tableActividadIndex", isOrderJS, tipoorden, columnaorden);
    },

    setFormSubmit: function(form)
    {
        if (form == "formActividadBusqueda")
            jsCustom.Funcion.clearInputText(form, jsActividad.variables.inputtextpaginate, "1");

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

        if (formId == "formActividadBusqueda")
        {
            var html = jsCustom.Funcion.getValidateDefault(data.custom01, "");
            var nroPaginas = jsCustom.Funcion.getValidateDefault(data.custom02, "");
            var tipoOrden = jsCustom.Funcion.getValidateDefault(data.custom03, "");
            var columnaOrden = jsCustom.Funcion.getValidateDefault(data.custom04, "");

            if (html != "")
                $("#divActividadListaBusqueda").html(html);

            jsCustom.Funcion.setValueHiddenforInputForm(formId);

            $("#" + formId + "_TipoOrden").val(tipoOrden);
            $("#" + formId + "_ColumnaOrden").val(columnaOrden);
            
            this.setTableIndex(nroPaginas, tipoOrden, columnaOrden);
            
            if (formId == "formActividadBusqueda")
                $("#modalActividadSearch").modal("hide");
        }
    },

    setDeleteItem: function(custom)
    {
        if (custom == "delete")
            this.setSearchAdvanced();
    },

    setSearchAdvanced: function()
    {
        var form = "formActividadBusqueda";
        var inputtext = ["TipoOrden", "ColumnaOrden"];

        jsCustom.Funcion.clearInputText(form, inputtext, "");
        jsCustom.Funcion.clearInputText(form, jsActividad.variables.inputtextpaginate, "1");

        $("#" + form).submit();
    },
    
};
