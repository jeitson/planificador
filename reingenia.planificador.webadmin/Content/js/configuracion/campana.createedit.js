if (typeof (jsCampana) == "undefined")
{
    jsCampana = {};
}

jsCampana =
{
    initCategoria: function ()
    {

        $("input[type='radio']").on('ifChecked', function (e)
        {
            e.preventDefault();

            var data = {};

            try
            {
                data.nombre = jsCustom.Funcion.getValidate($(this), "nombre", "", "data", "string");
                data.campanaid = $("#formCampanaCategoria_id").val();
                data.tipoactividad = $(this).val();
                
                $("#boxCategoria").hide();
                $("#divTitle").hide();
                $("#divSave").hide();
                $("#titleActividad").html("");
                $("#boxCategoria").html("");

                data.lstBE = jsCustom.Funcion.getObjectJSON(jsCampana.Variables.urlObtenerCategoria, { campanaid: data.campanaid, tipoactividad: data.tipoactividad });

                if (data.lstBE != null)
                {
                    data.html = "";

                    for (let elem in data.lstBE)
                    {
                        data.html += "<div class='checkbox'>";
                        data.html += "<label>";
                        data.html += "<input type='checkbox' name='categorias' class='square-green' id='" + data.lstBE[elem].id + "' value='" + data.lstBE[elem].value + "'" + (data.lstBE[elem].ischecked ? " checked='checked'" : "") + " />";
                        data.html += "&nbsp;&nbsp;" + data.lstBE[elem].text;
                        data.html += "</label>";
                        data.html += "</div>";
                    }

                    $("#titleActividad").html(data.nombre);
                    $("#boxCategoria").html(data.html);

                    $("#formCampanaCategoria_tipoactividad").val(data.tipoactividad);

                    iCheckMain.init();
                    jsCampana.initCategoria();
                
                    $("#boxCategoria").show();
                    $("#divTitle").show();
                    $("#divSave").show();
                }
            }
            catch (e)
            {
                jsCustom.Funcion.showMessage(jsCustom.Funcion.getValidateDefault("Categoria: " + e.message));
            }

            data = null;
        });

    }
}

jsCampana.Variables =
{
    seleccionar: "",
    urlObtenerCategoria: "",
}

jsCampana.Funcion =
{
    onLoadCreate: function ()
    {
        $("#formCampanaCreate_tipogestion").select2({ placeholder: jsCampana.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        $("#formCampanaCreate_objetivo").select2({ placeholder: jsCampana.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        $("#formCampanaCreate_tiposervicio").select2({ placeholder: jsCampana.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        $("#formCampanaCreate_actividadinicial").select2({ placeholder: jsCampana.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });

        jsCustom.item.jsObject = this;
    },

    onLoadEdit: function (isAdministradorSistema)
    {
        $("#formCampanaEdit_tipogestion").select2({ placeholder: jsCampana.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        $("#formCampanaEdit_objetivo").select2({ placeholder: jsCampana.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        $("#formCampanaEdit_tiposervicio").select2({ placeholder: jsCampana.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        $("#formCampanaEdit_actividadinicial").select2({ placeholder: jsCampana.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });

        if (isAdministradorSistema)
            $("#formCampanaEdit_estado").select2({ placeholder: jsCampana.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });

        jsCustom.item.jsObject = this;
    },

    onLoadCategoria: function ()
    {
        jsCustom.item.jsObject = this;

        $("#formCampanaCategoria").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formCampanaCategoria"));

        iCheckMain.init();
        jsCampana.initCategoria();
    },

    setFormSubmit: function (form)
    {
        if (form == "formCampanaCreate" || form == "formCampanaEdit")
        {
            if ($("#" + form).valid())
            {
                var url = $("#" + form).attr("action");

                if (form == "formCampanaCreate")
                    url = url + "Valid";

                if (form == "formCampanaEdit")
                    url = url.replace("Edit", "EditValid");

                var data = $("#" + form).serialize();
                var isOK = jsCustom.Funcion.getValidSave(url, data);
                
                return isOK;
            }
            else 
                return false;
        }

        if (form == "formCampanaCategoria")
        {
            if ($("#" + form).valid())
            {
                var url = $("#" + form).attr("action");
                
                url = url.replace("Update", "UpdateValid");

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

        if (formId == "formCampanaCategoria")
        {
            jsCustom.Funcion.showMessage(jsCustom.Funcion.getValidateDefault(data.message));
        }
    },
    
};
