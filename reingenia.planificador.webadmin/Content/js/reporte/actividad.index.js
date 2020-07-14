if (typeof (jsActividad) == "undefined")
{
    jsActividad = {};
}

jsActividad.variables =
{
    urlResumen: "",
}

jsActividad.Funcion =
{
    onLoadIndex: function ()
    {
        jsCustom.item.jsObject = this;

        this.setTableResumen();
    },

    setTableResumen: function()
    {
        var obj = jsCustom.Funcion.getJSONURL(jsActividad.variables.urlResumen);

        if (obj.ok)
        {
            if (obj.result != null) 
                $("#divResumen").html(obj.result.custom01);
        }
        else
            jsCustom.Funcion.showErrorAjax(obj.result, obj.status, obj.xhr);
    },
    
};
