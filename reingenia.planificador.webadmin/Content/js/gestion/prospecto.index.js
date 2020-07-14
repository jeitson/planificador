if (typeof (jsProspecto) == "undefined")
{
    jsProspecto = {};
}

jsProspecto =
{
    init: function ()
    {
        $(document).on("click", "#qsSearch", function (e)
        {
            try
            {
                e.preventDefault();

                var form = "formProspectoBusqueda";
                var tipo = jsCustom.Funcion.getValidateDefault($("#qsTipoBusqueda").val(), "");
                var valor = jsCustom.Funcion.getValidateDefault($("#qsValue").val(), "");

                if (tipo == "")
                {
                    jsCustom.Funcion.showMessage(jsProspecto.variables.tipoEmpty);

                    return;
                }

                if (valor == "")
                {
                    jsCustom.Funcion.showMessage(jsProspecto.variables.valorEmpty);

                    return;
                }

                $("#formProspectoBusqueda_tipo").val(tipo);
                $("#" + form + "_valor").val(valor);
                $("#btnProspectoSearch").trigger("click");
            }
            catch (e)
            {
                jsCustom.Funcion.showMessage('qsSearch: ' + e.message);
            }
        });
    }
}

jsProspecto.variables =
{
    inputtextpaginate: ["pagina", "tipoorden", "columnaorden"],
    seleccionar: "",
    tipoEmpty: "",
    valorEmpty: "",
}

jsProspecto.Funcion =
{
    onLoadIndex: function ()
    {
        jsCustom.item.jsObject = this;

        $("#qsTipoBusqueda").select2({ placeholder: jsProspecto.variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });

        this.setTableIndex(0, "", "");
        
        $("#formProspectoBusqueda").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formProspectoBusqueda"));

        this.setSearchAdvanced();

        jsProspecto.init();
    },

    setTableIndex: function(nropaginas, tipoorden, columnaorden)
    {
        var columns = [{ "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": false } ];
        var isOrderJS = false;

        jsCustom.Funcion.setDataTable("tableProspectoIndex", columns, isOrderJS);
        jsCustom.Funcion.setOrderTable("tableProspectoIndex", isOrderJS, tipoorden, columnaorden);
    },

    setFormSubmit: function(form)
    {
    	if (form == "formProspectoBusqueda")
            jsCustom.Funcion.clearInputText(form, jsProspecto.variables.inputtextpaginate, "1");

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

        if (formId == "formProspectoBusqueda")
        {
            var html = jsCustom.Funcion.getValidateDefault(data.custom01, "");
            var nroPaginas = jsCustom.Funcion.getValidateDefault(data.custom02, "");
            var tipoOrden = jsCustom.Funcion.getValidateDefault(data.custom03, "");
            var columnaOrden = jsCustom.Funcion.getValidateDefault(data.custom04, "");

            if (html != "")
                $("#divProspectoListaBusqueda").html(html);

            jsCustom.Funcion.setValueHiddenforInputForm(formId);

            $("#" + formId + "_TipoOrden").val(tipoOrden);
            $("#" + formId + "_ColumnaOrden").val(columnaOrden);
            
            this.setTableIndex(nroPaginas, tipoOrden, columnaOrden);
            
            if (formId == "formProspectoBusqueda")
                $("#modalProspectoSearch").modal("hide");
        }
    },

    setDeleteItem: function(custom)
    {
        if (custom == "disabled" || custom == "delete")
            this.setSearchAdvanced();
    },

    setSearchAdvanced: function()
    {
        var form = "formProspectoBusqueda";
        var inputtext = ["tipo", "valor", "Tipo", "Valor", "TipoOrden", "ColumnaOrden"];

        jsCustom.Funcion.clearInputText(form, inputtext, "");
        jsCustom.Funcion.clearInputText(form, jsProspecto.variables.inputtextpaginate, "1");
        $("#qsTipoBusqueda").select2("val", "");
        $("#qsValue").val("");

        $("#" + form).submit();
    }
    
};