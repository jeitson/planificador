if (typeof (jsAuthentication) == "undefined")
{
    jsAuthentication = {};
}

jsAuthentication =
{
    init: function ()
    {
        $(document).on("click", ".btnForm", function (e)
        {
            e.preventDefault();

            jsAuthentication.Funcion.hideMessage();
            jsAuthentication.Funcion.submitForm($(this));
        });
    }
}

jsAuthentication.Variables =
{
    user: "",
    password: "",
}

jsAuthentication.Funcion =
{
    onLoad: function ()
    {
        iCheckMain.init();
        jsAuthentication.init();

        $("#formAuthentication_user").val("Administrador");
        $("#formAuthentication_password").val("Desarrollo$");
        $('#formAuthentication_MantenerSesion').iCheck('check').iCheck('update');
    },

    hideMessage: function ()
    {
        $("#divListMessage").hide();
    },

    getValidate: function (obj, param, defaultValue, type, typeData)
    {
        try
        {
            if (type == "data")
                value = obj.data(param);
            else if (type == "prop")
                value = obj.prop(param);
            else if (type == "attr")
                value = obj.attr(param);

            if (typeof (value) == "undefined")
                return defaultValue;

            if (value == null)
                return defaultValue;

            if (typeData == "string")
            {
                if (('' + value).trim() == "")
                    return defaultValue;
            }
        
            return value;
        }
        catch (err)
        {
            return defaultValue;
        }
    },

    submitForm: function (obj)
    {
        var form = this.getValidate(obj, "form", null, "data", "string");

        if (form == null)
            return;

        $('#' + form).submit();
    },

}
