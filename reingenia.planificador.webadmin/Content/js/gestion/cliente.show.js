if (typeof (jsCliente) == "undefined")
{
    jsCliente = {};
}

jsCliente =
{
    init: function ()
    {
        $(document).on("click", '.btnURLTableShow', function (e) {
            e.preventDefault();

            jsCliente.Funcion.showDetail($(this));
        });
    }
}

jsCliente.Funcion =
{
    onLoad: function ()
    {
        jsCliente.init();
        jsCustom.Default.setPanel();

        jsCustom.item.jsObject = this;
    },

    showDetail: function (obj)
    {
        var url = jsCustom.Funcion.getValidate(obj, "url", null, "data", "string");
        var idEntity = jsCustom.Funcion.getValidate(obj.closest('tr'), "id", null, "data", "string");
        var urlShow = jsCustom.Funcion.getValidate(obj.closest('tr').parent().parent(), url, null, "data", "string");

        if (url == null || idEntity == null || urlShow == null)
            return;

        if (url = "showdireccion")
        {
            var direccion = jsCustom.Funcion.getObjectJSON(urlShow, { clientedireccionid: idEntity });

            $("#divDetalle").html(direccion);
            $("#modalDetalleDireccion").modal('show');
        }
        else if (url = "showinformacion")
        {
            var informacion = jsCustom.Funcion.getObjectJSON(urlShow, { clienteinformacionid: idEntity });

            $("#divDetalle").html(informacion);
            $("#modalDetalleInformacion").modal('show');
        }
    }
    
};
