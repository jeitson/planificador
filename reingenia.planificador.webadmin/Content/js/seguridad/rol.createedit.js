if (typeof (jsRol) == "undefined")
{
    jsRol = {};
}

jsRol =
{
    initMenu: function ()
    {
        
        $("input[type='checkbox']").on('ifChecked', function (e)
        {
            var inputid = $(e.target).attr("id");
            var level = $("#" + inputid).data('level');
            var root = $("#" + inputid).data('root');

            if (root == "s")
            {
                $('.lvl' + level).each(function ()
                {
                    inputid = $(this).attr("id");
                    root = $("#" + inputid).data('root');

                    if (root == "n")
                        $('#' + inputid).iCheck('check').iCheck('update');
                });
            }
            else
            {
                var inputidroot = "";
                var inputiditem = "";
                var inputarray = [];

                $('.lvl' + level).each(function ()
                {
                    inputiditem = $(this).attr("id");
                    root = $("#" + inputiditem).data('root');

                    if (root == "n")
                    {
                        if (!($('#' + inputiditem).is(":checked")) && inputiditem != inputid)
                            inputarray.push(inputiditem);
                    }
                    else
                        inputidroot = inputiditem;
                });

                $('#' + inputidroot).iCheck('check').iCheck('update');

                inputarray.forEach(function (itemid)
                {
                    $('#' + itemid).iCheck('uncheck').iCheck('update');
                })
            }
        });

        $("input[type='checkbox']").on('ifUnchecked', function (e)
        {
            var inputid = $(e.target).attr("id");
            var level = $("#" + inputid).data('level');
            var root = $("#" + inputid).data('root');

            if (root == "s")
            {
                $('.lvl' + level).each(function ()
                {
                    inputid = $(this).attr("id");
                    root = $("#" + inputid).data('root');

                    if (root == "n")
                        $('#' + inputid).iCheck('uncheck').iCheck('update');
                });
            }
            else
            {
                var inputidroot = "";
                var inputiditem = "";
                var inputchecked = 0;

                $('.lvl' + level).each(function ()
                {
                    inputiditem = $(this).attr("id");
                    root = $("#" + inputiditem).data('root');

                    if (root == "n")
                    {
                        if ($('#' + inputiditem).is(":checked") && inputiditem != inputid)
                            inputchecked++;
                    }
                    else
                        inputidroot = inputiditem;
                });

                if (inputchecked == 0)
                    $('#' + inputidroot).iCheck('uncheck').iCheck('update');
            }
        });
        
    },

    initPermissions: function ()
    {

        $("input[type='radio']").on('ifChecked', function (e)
        {
            e.preventDefault();

            var data = {};

            try
            {
                data.nombre = jsCustom.Funcion.getValidate($(this), "nombre", "", "data", "string");
                data.rolid = $("#formRolPermissions_id").val();
                jsRol.Variables.permisoid = $(this).val();

                $("#boxPermisos").hide();
                $("#divTitle").hide();
                $("#divSave").hide();
                $("#titlePermiso").html("");
                $("#boxPermisos").html("");

                data.lstBE = jsCustom.Funcion.getObjectJSON(jsRol.Variables.urlObtenerPermisos, { id: data.rolid, permisoid: jsRol.Variables.permisoid });

                if (data.lstBE != null)
                {
                    data.html = "";

                    for (let elem in data.lstBE)
                    {
                        data.html += "<div class='checkbox'>";
                        data.html += "<label>";
                        data.html += "<input type='checkbox' name='permisos' class='square-green' id='" + data.lstBE[elem].id + "' value='" + data.lstBE[elem].value + "'" + (data.lstBE[elem].ischecked ? " checked='checked'" : "") + " />";
                        data.html += "&nbsp;&nbsp;<i class='" + data.lstBE[elem].icon + "'></i>";
                        data.html += "&nbsp;&nbsp;" + data.lstBE[elem].text;
                        data.html += "</label>";
                        data.html += "</div>";
                    }

                    $("#titlePermiso").html(data.nombre);
                    $("#boxPermisos").html(data.html);

                    iCheckMain.init();
                    jsRol.initPermissions();
                
                    $("#boxPermisos").show();
                    $("#divTitle").show();
                    $("#divSave").show();
                }
            }
            catch (e)
            {
                jsCustom.Funcion.showMessage(jsCustom.Funcion.getValidateDefault("Permission: " + e.message));
            }

            data = null;
        });

    }
}

jsRol.Variables =
{
    seleccionar: "",
    urlObtenerPermisos: "",
    permisoid: ""
}

jsRol.Funcion =
{
    onLoadCreate: function ()
    {
        jsCustom.item.jsObject = this;
    },

    onLoadEdit: function (isAdministradorSistema)
    {
        if (isAdministradorSistema)
            $("#formRolEdit_estado").select2({ placeholder: jsRol.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        
        jsCustom.item.jsObject = this;
    },

    onLoadMenu: function ()
    {
        jsCustom.item.jsObject = this;

        iCheckMain.init();
        jsRol.initMenu();
    },

    onLoadPermissions: function ()
    {
        jsCustom.item.jsObject = this;

        $("#formRolPermissions").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formRolPermissions"));

        iCheckMain.init();
        jsRol.initPermissions();
    },

    setFormSubmit: function (form)
    {
        if (form == "formRolCreate" || form == "formRolEdit")
        {
            if ($("#" + form).valid())
            {
                var url = $("#" + form).attr("action");

                if (form == "formRolCreate")
                    url = url + "Valid";

                if (form == "formRolEdit")
                    url = url.replace("Edit", "EditValid");

                var data = $("#" + form).serialize();
                var isOK = jsCustom.Funcion.getValidSave(url, data);
                
                return isOK;
            }
            else 
                return false;
        }

        if (form == "formRolPermissions")
        {
            if ($("#" + form).valid())
            {
                var url = $("#" + form).attr("action");
                
                url = url.replace("Permissions", "PermissionsValid");

                $("#formRolPermissions_permisopadreid").val(jsRol.Variables.permisoid);

                var data = $("#" + form).serialize();
                var isOK = jsCustom.Funcion.getValidSave(url, data);
                
                return isOK;
            }
            else 
                return false;
        }

        return true;
    },

    successForm: function(formId, data)
    {
        var error = jsCustom.Funcion.getValidateDefault(data.isError, "");
		
        if (error == "S")
        {
            jsCustom.Funcion.showMessage(jsCustom.Funcion.getValidateDefault(data.message));
		
            return;
        }

        if (formId == "formRolPermissions")
        {
            jsCustom.Funcion.showMessage(jsCustom.Funcion.getValidateDefault(data.message));
        }
    },
    
};
