if (typeof (jsAsesor) == "undefined")
{
    jsAsesor = {};
}

jsAsesor.variables =
{
    inputtextpaginate: ["pagina", "tipoorden", "columnaorden"],
    titleCrearUsuario: "",
    messageCrearUsuario: ""
}

jsAsesor.Funcion =
{
    onLoadIndex: function ()
    {
        jsCustom.item.jsObject = this;
        
        this.setTableIndex(0, "", "");
        
        $("#formAsesorBusqueda").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formAsesorBusqueda"));

        this.setSearchAdvanced();
    },

    setTableIndex: function(nropaginas, tipoorden, columnaorden)
    {
        var columns = [{ "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": false } ];
        var isOrderJS = false;

        jsCustom.Funcion.setDataTable("tableAsesorIndex", columns, isOrderJS);
        jsCustom.Funcion.setOrderTable("tableAsesorIndex", isOrderJS, tipoorden, columnaorden);
    },

    setFormSubmit: function(form)
    {
    	if (form == "formAsesorBusqueda")
            jsCustom.Funcion.clearInputText(form, jsAsesor.variables.inputtextpaginate, "1");

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

        if (formId == "formAsesorBusqueda")
        {
            var html = jsCustom.Funcion.getValidateDefault(data.custom01, "");
            var nroPaginas = jsCustom.Funcion.getValidateDefault(data.custom02, "");
            var tipoOrden = jsCustom.Funcion.getValidateDefault(data.custom03, "");
            var columnaOrden = jsCustom.Funcion.getValidateDefault(data.custom04, "");

            if (html != "")
                $("#divAsesorListaBusqueda").html(html);

            jsCustom.Funcion.setValueHiddenforInputForm(formId);

            $("#" + formId + "_TipoOrden").val(tipoOrden);
            $("#" + formId + "_ColumnaOrden").val(columnaOrden);
            
            this.setTableIndex(nroPaginas, tipoOrden, columnaOrden);
            
            if (formId == "formAsesorBusqueda")
                $("#modalAsesorSearch").modal("hide");
        }
    },

    setSearchAdvanced: function()
    {
        var form = "formAsesorBusqueda";
        var inputtext = ["TipoOrden", "ColumnaOrden"];

        jsCustom.Funcion.clearInputText(form, inputtext, "");
        jsCustom.Funcion.clearInputText(form, jsAsesor.variables.inputtextpaginate, "1");

        $("#" + form).submit();
    },

    setMessage: function (tipo, item)
    {
        if (tipo == "crearusuario")
        {
            item.title = jsAsesor.variables.titleCrearUsuario;
            item.message = jsAsesor.variables.messageCrearUsuario;
        }

        return item;
    },

    setDeleteItem: function(custom)
    {
        if (custom == "disabled" || custom == "delete" || custom == "crearusuario")
            this.setSearchAdvanced();
    },
    
};
