if (typeof (jsActividadDiaria) == "undefined")
{
    jsActividadDiaria = {};
}

jsActividadDiaria.variables =
{
    inputtextpaginate: ["pagina", "tipoorden", "columnaorden"]
}

jsActividadDiaria.Funcion =
{
    onLoadIndex: function ()
    {
        jsCustom.item.jsObject = this;
        
        this.setTableIndex(0, "", "");
        
        $("#formActividadDiariaBusqueda").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formActividadDiariaBusqueda"));

        this.setSearchAdvanced();
    },

    setTableIndex: function(nropaginas, tipoorden, columnaorden)
    {
        var columns = [{ "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": false } ];
        var isOrderJS = false;

        jsCustom.Funcion.setDataTable("tableActividadIndex", columns, isOrderJS);
        jsCustom.Funcion.setOrderTable("tableActividadIndex", isOrderJS, tipoorden, columnaorden);
    },

    setFormSubmit: function(form)
    {
    	if (form == "formActividadDiariaBusqueda")
            jsCustom.Funcion.clearInputText(form, jsActividadDiaria.variables.inputtextpaginate, "1");

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

        if (formId == "formActividadDiariaBusqueda")
        {
            var html = jsCustom.Funcion.getValidateDefault(data.custom01, "");
            var nroPaginas = jsCustom.Funcion.getValidateDefault(data.custom02, "");
            var tipoOrden = jsCustom.Funcion.getValidateDefault(data.custom03, "");
            var columnaOrden = jsCustom.Funcion.getValidateDefault(data.custom04, "");

            if (html != "")
                $("#divActividadDiariaListaBusqueda").html(html);

            jsCustom.Funcion.setValueHiddenforInputForm(formId);

            $("#" + formId + "_TipoOrden").val(tipoOrden);
            $("#" + formId + "_ColumnaOrden").val(columnaOrden);
            
            this.setTableIndex(nroPaginas, tipoOrden, columnaOrden);
            
            if (formId == "formActividadDiariaBusqueda")
                $("#modalActividadDiariaSearch").modal("hide");
        }
    },

    setSearchAdvanced: function()
    {
        var form = "formActividadDiariaBusqueda";
        var inputtext = ["TipoOrden", "ColumnaOrden"];

        jsCustom.Funcion.clearInputText(form, inputtext, "");
        jsCustom.Funcion.clearInputText(form, jsActividadDiaria.variables.inputtextpaginate, "1");

        $("#" + form).submit();
    },

    setDeleteItem: function(custom)
    {
        if (custom == "delete")
            this.setSearchAdvanced();
    },
    
};
