if (typeof (jsCliente) == "undefined")
{
    jsCliente = {};
}

jsCliente =
{
    init: function ()
    {
        $(document).on("click", "#qsSearch", function (e)
        {
            try
            {
                e.preventDefault();

                var form = "formClienteBusqueda";
                var tipo = jsCustom.Funcion.getValidateDefault($("#qsTipoBusqueda").val(), "");
                var valor = jsCustom.Funcion.getValidateDefault($("#qsValue").val(), "");

                if (tipo == "")
                {
                    jsCustom.Funcion.showMessage(jsCliente.variables.tipoEmpty);

                    return;
                }

                if (valor == "")
                {
                    jsCustom.Funcion.showMessage(jsCliente.variables.valorEmpty);

                    return;
                }

                $("#formClienteBusqueda_tipo").val(tipo);
                $("#" + form + "_valor").val(valor);
                $("#btnClienteSearch").trigger("click");
            }
            catch (e)
            {
                jsCustom.Funcion.showMessage('qsSearch: ' + e.message);
            }
        });
    }
}

jsCliente.variables =
{
    inputtextpaginate: ["pagina", "tipoorden", "columnaorden"],
    seleccionar: "",
    tipoEmpty: "",
    valorEmpty: "",
}

jsCliente.Funcion =
{
    onLoadIndex: function ()
    {
        jsCustom.item.jsObject = this;

        $("#qsTipoBusqueda").select2({ placeholder: jsCliente.variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        
        this.setTableIndex(0, "", "");
        
        $("#formClienteBusqueda").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formClienteBusqueda"));

        this.setSearchAdvanced();

        jsCliente.init();
    },

    setTableIndex: function(nropaginas, tipoorden, columnaorden)
    {
        var columns = [{ "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": false } ];
        var isOrderJS = false;

        jsCustom.Funcion.setDataTable("tableClienteIndex", columns, isOrderJS);
        jsCustom.Funcion.setOrderTable("tableClienteIndex", isOrderJS, tipoorden, columnaorden);
    },

    setFormSubmit: function(form)
    {
    	if (form == "formClienteBusqueda")
            jsCustom.Funcion.clearInputText(form, jsCliente.variables.inputtextpaginate, "1");

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

        if (formId == "formClienteBusqueda")
        {
            var html = jsCustom.Funcion.getValidateDefault(data.custom01, "");
            var nroPaginas = jsCustom.Funcion.getValidateDefault(data.custom02, "");
            var tipoOrden = jsCustom.Funcion.getValidateDefault(data.custom03, "");
            var columnaOrden = jsCustom.Funcion.getValidateDefault(data.custom04, "");

            if (html != "")
                $("#divClienteListaBusqueda").html(html);

            jsCustom.Funcion.setValueHiddenforInputForm(formId);

            $("#" + formId + "_TipoOrden").val(tipoOrden);
            $("#" + formId + "_ColumnaOrden").val(columnaOrden);
            
            this.setTableIndex(nroPaginas, tipoOrden, columnaOrden);
            
            if (formId == "formClienteBusqueda")
                $("#modalClienteSearch").modal("hide");
        }
    },

    setSearchAdvanced: function()
    {
        var form = "formClienteBusqueda";
        var inputtext = ["tipo", "valor", "Tipo", "Valor", "TipoOrden", "ColumnaOrden"];

        jsCustom.Funcion.clearInputText(form, inputtext, "");
        jsCustom.Funcion.clearInputText(form, jsCliente.variables.inputtextpaginate, "1");

        $("#qsTipoBusqueda").select2("val", "");
        $("#qsValue").val("");
        $("#" + form + "_columnaorden").val("3");
        $("#" + form + "_ColumnaOrden").val("3");

        $("#" + form).submit();
    }
    
};
