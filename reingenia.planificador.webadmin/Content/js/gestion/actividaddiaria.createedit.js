if (typeof (jsActividadDiaria) == "undefined")
{
    jsActividadDiaria = {};
}

jsActividadDiaria =
{
    init: function ()
    {
        $(document).on("change", "#formActividadDiariaRetroalimentar_etiquetagestionid", function (e)
        {
            try
            {
                e.preventDefault();

                var etiquetagestionid = $(this).val();

                $("#boxFechaPromesa").hide();
                $("#boxFechaAgenda").hide();
                $("#boxProducto").hide();
                $("#boxObservacion").hide();

                for (var i = 0; i < jsActividadDiaria.Variables.configuracion.length; i++)
                {
                    if (jsActividadDiaria.Variables.configuracion[i].id == etiquetagestionid)
                    {
                        if (jsActividadDiaria.Variables.configuracion[i].fechareagenda)
                            $("#boxFechaAgenda").show();

                        if (jsActividadDiaria.Variables.configuracion[i].producto)
                            $("#boxProducto").show();

                        if (jsActividadDiaria.Variables.configuracion[i].observacion)
                            $("#boxObservacion").show();

                        if (jsActividadDiaria.Variables.configuracion[i].fechapromesa)
                            $("#boxFechaPromesa").show();

                        break;
                    }
                }

                $("#formActividadDiariaRetroalimentar_fechapromesapago").val("");
                $("#formActividadDiariaRetroalimentar_fechareagenda").val("");
                $("#formActividadDiariaRetroalimentar_productoid").val("").trigger("change");
                $("#formActividadDiariaRetroalimentar_tipoproductoid").val("").trigger("change");
                $("#formActividadDiariaRetroalimentar_observacion").val("");
            }
            catch (e)
            {
                jsCustom.Funcion.showMessage('formActividadDiariaRetroalimentar_etiquetagestionid: ' + e.message);
            }
        });

        $(document).on("change", ".producto", function (e)
        {
            try
            {
                e.preventDefault();
                
                var iId = parseInt($(this).attr('id').replace(jsActividadDiaria.Variables.form + "_productoid", ""));
                var value = jsCustom.Funcion.getValidateDefault($(this).val(), "");

                for (var i = iId + 1; i <= jsActividadDiaria.Variables.nivelesproducto; i++)
                    $("#" + jsActividadDiaria.Variables.form + "_productoid" + (1000 + i).toString().substr(1)).empty();

                if (value != "")
                    jsCustom.Funcion.setDLLJSON(jsActividadDiaria.Variables.urlListarProducto, { nivel: jsActividadDiaria.Variables.nivelproducto + (1001 + iId).toString().substr(1), nivelsuperiorid: value }, "#" + jsActividadDiaria.Variables.form + "_productoid" + (1001 + iId).toString().substr(1), null);
                
                $("#" + jsActividadDiaria.Variables.form + "_productoid" + (1000 + i).toString().substr(1)).val("").trigger("change");
            }
            catch (e)
            {
                jsCustom.Funcion.showMessage("formActividadDiaria .producto: " + e.message);
            }
        });

        $(document).on("click", ".btnMap", function (e)
        {
            try
            {
                e.preventDefault();

                var custom = jsCustom.Funcion.getValidate($(this), "custom", null, "data", "string");

                if (custom == null)
                    return;

                jsMapa.mapa = custom;

                ctrlq();
        
                $("#modalMapa").modal('show');
            }
            catch (e)
            {
                jsCustom.Funcion.showMessage('btnMap: ' + e.message);
            }
        });

        $(document).on("click", '.btnArchivoDelete', function (e)
        {
            e.preventDefault();

            var id = jsCustom.Funcion.getValidate($(this).closest('tr'), "id", null, "data", "string");
            jsCustom.Funcion.getObjectJSON(jsActividadDiaria.Variables.urlArchivoBorrar, { id: id });

            jsActividadDiaria.Funcion.getArchivos();
        });

        $(document).on("change", "#formActividadDiariaCreate_campanaid, #formActividadDiariaCreate_tipo", function (e)
        {
            try
            {
                e.preventDefault();

                var campanaid = jsCustom.Funcion.getValidateDefault($("#" + jsActividadDiaria.Variables.form + "_campanaid").val(), "");
                var tipoactividad = jsCustom.Funcion.getValidateDefault($("#" + jsActividadDiaria.Variables.form + "_tipo").val(), "");

                if ($(this).attr('id') == "formActividadDiariaCreate_campanaid")
                    jsActividadDiaria.Funcion.setObjetivoCodigo(campanaid);

                $("#" + jsActividadDiaria.Variables.form + "_categoria").empty();

                if (campanaid == "" || tipoactividad == "")
                    return;

                jsCustom.Funcion.setDLLJSON(jsActividadDiaria.Variables.urlListarCategoria, { campanaid: campanaid, tipoactividad: tipoactividad }, "#" + jsActividadDiaria.Variables.form + "_categoria", "");

                $("#" + jsActividadDiaria.Variables.form + "_categoria").val("").trigger("change");
            }
            catch (e)
            {
                jsCustom.Funcion.showMessage(jsActividadDiaria.Variables.form + '_tipo: ' + e.message);
            }
        });

        $(document).on("change", "#formActividadDiariaCreate_asesorid", function (e)
        {
            try
            {
                e.preventDefault();

                var asesorid = jsCustom.Funcion.getValidateDefault($("#" + jsActividadDiaria.Variables.form + "_asesorid").val(), "");

                $("#" + jsActividadDiaria.Variables.form + "_clienteid").empty();
                $("#" + jsActividadDiaria.Variables.form + "_direccionid").empty();
                $("#" + jsActividadDiaria.Variables.form + "_zonagestionid").empty();

                if (asesorid == "" || jsActividadDiaria.Variables.objetivo == "")
                    return;

                jsCustom.Funcion.setDLLJSON(jsActividadDiaria.Variables.urlListarCliente, { objetivo: jsActividadDiaria.Variables.objetivo, asesorid: asesorid }, "#" + jsActividadDiaria.Variables.form + "_clienteid", null);

                $("#" + jsActividadDiaria.Variables.form + "_clienteid").val("").trigger("change");
                $("#" + jsActividadDiaria.Variables.form + "_direccionid").val("").trigger("change");
                $("#" + jsActividadDiaria.Variables.form + "_zonagestionid").val("").trigger("change");
            }
            catch (e)
            {
                jsCustom.Funcion.showMessage(jsActividadDiaria.Variables.form + '_asesorid: ' + e.message);
            }
        });

        $(document).on("change", "#formActividadDiariaCreate_clienteid", function (e)
        {
            try
            {
                e.preventDefault();

                var clienteid = jsCustom.Funcion.getValidateDefault($("#" + jsActividadDiaria.Variables.form + "_clienteid").val(), "");

                $("#" + jsActividadDiaria.Variables.form + "_direccionid").empty();
                $("#" + jsActividadDiaria.Variables.form + "_zonagestionid").empty();

                if (clienteid == "" || jsActividadDiaria.Variables.objetivo == "")
                    return;

                jsCustom.Funcion.setDLLJSON(jsActividadDiaria.Variables.urlListarDireccion, { objetivo: jsActividadDiaria.Variables.objetivo, clienteid: clienteid }, "#" + jsActividadDiaria.Variables.form + "_direccionid", null);
                jsCustom.Funcion.setDLLJSON(jsActividadDiaria.Variables.urlListarZonaGestion, { objetivo: jsActividadDiaria.Variables.objetivo, clienteid: clienteid }, "#" + jsActividadDiaria.Variables.form + "_zonagestionid", null);

                $("#" + jsActividadDiaria.Variables.form + "_direccionid").val("").trigger("change");
                $("#" + jsActividadDiaria.Variables.form + "_zonagestionid").val("").trigger("change");
            }
            catch (e)
            {
                jsCustom.Funcion.showMessage(jsActividadDiaria.Variables.form + '_clienteid: ' + e.message);
            }
        });
    }
}

jsActividadDiaria.Variables =
{
    seleccionar: "",
    nivelesproducto: 0,
    nivelproducto: "",
    urlListarProducto: "",
    defaultLatitud: "",
    defaultLongitud: "",
    form: "",
    configuracion: [],
    urlArchivoBorrar: "",
    urlArchivoListar: "",
    urlListarCategoria: "",
    urlListarCliente: "",
    urlListarDireccion: "",
    urlListarZonaGestion: "",
    objetivo: "",
}

jsActividadDiaria.Funcion =
{

    onLoadCreate: function ()
    {
        jsActividadDiaria.Variables.form = "formActividadDiariaCreate";

        $("#formActividadDiariaCreate_campanaid").select2({ placeholder: jsActividadDiaria.Variables.seleccionar + "...", allowClear: true });
        $("#formActividadDiariaCreate_tipo").select2({ placeholder: jsActividadDiaria.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        $("#formActividadDiariaCreate_categoria").select2({ placeholder: jsActividadDiaria.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        $("#formActividadDiariaCreate_asesorid").select2({ placeholder: jsActividadDiaria.Variables.seleccionar + "...", allowClear: true });
        $("#formActividadDiariaCreate_clienteid").select2({ placeholder: jsActividadDiaria.Variables.seleccionar + "...", allowClear: true });
        $("#formActividadDiariaCreate_direccionid").select2({ placeholder: jsActividadDiaria.Variables.seleccionar + "...", allowClear: true });
        $("#formActividadDiariaCreate_zonagestionid").select2({ placeholder: jsActividadDiaria.Variables.seleccionar + "...", allowClear: true });
        $("#formActividadDiariaCreate_productoid001").select2({ placeholder: jsActividadDiaria.Variables.seleccionar + "...", allowClear: true });
        $("#formActividadDiariaCreate_productoid002").select2({ placeholder: jsActividadDiaria.Variables.seleccionar + "...", allowClear: true });

        jsCustom.Funcion.setDatePicker("#formActividadDiariaCreate_fecha", "bottom");

        jsCustom.item.jsObject = this;

        jsActividadDiaria.init();
    },

    onLoadRetroalimentar: function ()
    {
        jsActividadDiaria.Variables.form = "formActividadDiariaRetroalimentar";

        $("#formActividadDiariaRetroalimentar_etiquetagestionid").select2({ placeholder: jsActividadDiaria.Variables.seleccionar + "...", allowClear: true });
        $("#formActividadDiariaRetroalimentar_productoid001").select2({ placeholder: jsActividadDiaria.Variables.seleccionar + "...", allowClear: true });
        $("#formActividadDiariaRetroalimentar_productoid002").select2({ placeholder: jsActividadDiaria.Variables.seleccionar + "...", allowClear: true });

        jsCustom.Funcion.setDatePicker("#formActividadDiariaRetroalimentar_fechareagenda", "bottom");
        jsCustom.Funcion.setDatePicker("#formActividadDiariaRetroalimentar_fechapromesapago", "bottom");

        $("#formActividadArchivo_clasificacion").select2({ placeholder: jsActividadDiaria.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        $("#formActividadArchivo").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formActividadArchivo"));

        jsCustom.item.jsObject = this;

        jsActividadDiaria.init();

        $("#formActividadDiariaRetroalimentar_etiquetagestionid").trigger("change");
        $("#formActividadDiariaRetroalimentar_latitud").val($("#formActividadDiariaRetroalimentar_latitudaux").val());
        $("#formActividadDiariaRetroalimentar_longitud").val($("#formActividadDiariaRetroalimentar_longitudaux").val());
        $("#formActividadDiariaRetroalimentar_fechapromesapago").val($("#formActividadDiariaRetroalimentar_fechapromesapagoaux").val());
        $("#formActividadDiariaRetroalimentar_fechareagenda").val($("#formActividadDiariaRetroalimentar_fechareagendaaux").val());
        $("#formActividadDiariaRetroalimentar_observacion").val($("#formActividadDiariaRetroalimentar_observacionaux").val());
        $("#formActividadDiariaRetroalimentar_productoid001").val($("#formActividadDiariaRetroalimentar_tipoproductoidaux").val()).trigger("change");

        if ($("#formActividadDiariaRetroalimentar_productoidaux").val() != "")
            $("#formActividadDiariaRetroalimentar_productoid002").val($("#formActividadDiariaRetroalimentar_productoidaux").val()).trigger("change");

        this.getArchivos();
    },

    setFormSubmit: function (form)
    {
        if (form == "formActividadArchivo")
        {
            $("#formActividadArchivo_fecha").val(this.getFileDate());
            $("#formActividadArchivo_actividadid").val($("#formActividadDiariaRetroalimentar_id").val());
        }

        if (form == "formActividadDiariaRetroalimentar")
        {
            if ($("#" + form).valid())
            {
                var url = $("#" + form).attr("action");

                if (form == "formActividadDiariaRetroalimentar")
                    url = url.replace("Retroalimentar", "RetroalimentarValid");

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
            jsCustom.Funcion.showMessage(jsCustom.Funcion.getValidateDefault(data.message, ""));
		
            return;
        }

        if (formId == "formActividadArchivo")
        {
            $("#formActividadArchivo_nombre").val("");
            $("#formActividadArchivo_clasificacion").val("").trigger("change");
            $("#formActividadArchivo_latitud").val("");
            $("#formActividadArchivo_longitud").val("");
            document.getElementById('formActividadArchivo_file').value = null;

            this.getArchivos();

            return;
        }
    },
    
    setConfiguracion: function (id, fechareagenda, fechapromesa, producto, observacion)
    {
        var data = {};
        data.id = id;
        data.fechareagenda = fechareagenda;
        data.fechapromesa = fechapromesa;
        data.producto = producto;
        data.observacion = observacion;

        jsActividadDiaria.Variables.configuracion.push(data);
    },

    getArchivos: function ()
    {
        var id = $("#formActividadDiariaRetroalimentar_id").val();        
        var html = jsCustom.Funcion.getObjectJSON(jsActividadDiaria.Variables.urlArchivoListar, { actividadid: id });

        if (html != null)
            $("#divArchivos").html(html);

        $('.image-popup-vertical-fit').magnificPopup({ type: 'image', closeOnContentClick: true, mainClass: 'mfp-img-mobile', image: { verticalFit: true } });
    },

    getFileDate: function ()
    {
        var x = document.getElementById("formActividadArchivo_file");

        if (x.files.length > 0)
        {
            for (var i = 0; i < x.files.length; i++)
            {
                var file = x.files[i];
                
                if ('lastModifiedDate' in file)
                {
                    var date = new Date(file.lastModifiedDate);

                    return (("00" + date.getDate()).slice(-2) + "/" + ("00" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear() + " " + ("00" + date.getHours()).slice(-2) + ":" + ("00" + date.getMinutes()).slice(-2) + ":" + ("00" + date.getSeconds()).slice(-2));
                }
                    
            }
        }

        return "";
    },

    setObjetivo: function (id, objetivo)
    {
        var data = {};
        data.id = id;
        data.objetivo = objetivo;

        jsActividadDiaria.Variables.configuracion.push(data);
    },

    setObjetivoCodigo: function (campanaid)
    {
        var objetivo = jsActividadDiaria.Variables.objetivo;
        jsActividadDiaria.Variables.objetivo = "";

        if (campanaid != "")
        {
            for (var i = 0; jsActividadDiaria.Variables.configuracion.length; i++)
            {
                if (campanaid == jsActividadDiaria.Variables.configuracion[i].id)
                {
                    jsActividadDiaria.Variables.objetivo = jsActividadDiaria.Variables.configuracion[i].objetivo;

                    break;
                }
            }
        }

        if (objetivo != jsActividadDiaria.Variables.objetivo)
        {
            $("#" + jsActividadDiaria.Variables.form + "_clienteid").empty();
            $("#" + jsActividadDiaria.Variables.form + "_direccionid").empty();
            $("#" + jsActividadDiaria.Variables.form + "_zonagestionid").empty();

            $("#" + jsActividadDiaria.Variables.form + "_clienteid").val("").trigger("change");
            $("#" + jsActividadDiaria.Variables.form + "_direccionid").val("").trigger("change");
            $("#" + jsActividadDiaria.Variables.form + "_zonagestionid").val("").trigger("change");

            $("#" + jsActividadDiaria.Variables.form + "_asesorid").trigger("change");
        }

        $("#" + jsActividadDiaria.Variables.form + "_objetivo").val(jsActividadDiaria.Variables.objetivo);
    },

};
