if (typeof (jsProspecto) == "undefined")
{
    jsProspecto = {};
}

jsProspecto =
{
    init: function ()
    {
        $(document).on("change", "#formProspectoCreate_tipo, #formProspectoEdit_tipo", function (e)
        {
            var form = $(this).attr('id').replace("_tipo", "")

            try
            {
                e.preventDefault();

                if ($(this).val() == jsProspecto.Variables.tipopersona)
                {
                    $("#divNombres").removeClass("col-md-12").removeClass("col-md-6").addClass("col-md-6");
                    $("#divApellidos").show();
                    $("#divEstadoCivil").show();
                    $("#divSexo").show();
                }
                else
                {
                    $("#divNombres").removeClass("col-md-12").removeClass("col-md-6").addClass("col-md-12");
                    $("#divApellidos").hide();
                    $("#divEstadoCivil").hide();
                    $("#divSexo").hide();
                    $("#" + form + "_apellidos").val("");
                    $("#" + form + "_estadocivil").val("").trigger("change");
                    $("#" + form + "_sexo").val("").trigger("change");
                }
            }
            catch (e)
            {
                jsCustom.Funcion.showMessage(form + '_tipo: ' + e.message);
            }
        });

        $(document).on("change", ".ubigeonivelsuperiorid", function (e)
        {
            try
            {
                e.preventDefault();
                
                var iId = parseInt($(this).attr('id').replace("formProspectoDireccion_ubigeonivelsuperiorid", ""));
                var value = jsCustom.Funcion.getValidateDefault($(this).val(), "");

                for (var i = iId + 1; i <= jsProspecto.Variables.niveles; i++)
                    $("#formProspectoDireccion_ubigeonivelsuperiorid" + (1000 + i).toString().substr(1)).empty();

                if (value != "")
                    jsCustom.Funcion.setDLLJSON(jsProspecto.Variables.urlListarUbigeo, { nivel: jsProspecto.Variables.nivelubigeo + (1001 + iId).toString().substr(1), nivelsuperiorid: value }, "#formProspectoDireccion_ubigeonivelsuperiorid" + (1001 + iId).toString().substr(1), null);
                
                $("#formProspectoDireccion_ubigeonivelsuperiorid" + (1000 + i).toString().substr(1)).val("").trigger("change");
            }
            catch (e)
            {
                jsCustom.Funcion.showMessage("formProspectoDireccion .nivelsuperiorid: " + e.message);
            }
        });

        $(document).on("change", ".zonagestion", function (e)
        {
            try
            {
                e.preventDefault();
                
                var iId = parseInt($(this).attr('id').replace("formProspectoZonaGestion_zonagestionnivel", ""));
                var value = jsCustom.Funcion.getValidateDefault($(this).val(), "");

                for (var i = iId + 1; i <= jsProspecto.Variables.niveleszonagestion; i++)
                    $("#formProspectoZonaGestion_zonagestionnivel" + (1000 + i).toString().substr(1)).empty();

                if (value != "")
                    jsCustom.Funcion.setDLLJSON(jsProspecto.Variables.urlListarZonaGestion, { nivel: jsProspecto.Variables.nivelzonagestion + (1001 + iId).toString().substr(1), nivelsuperiorid: value }, "#formProspectoZonaGestion_zonagestionnivel" + (1001 + iId).toString().substr(1), null);
                
                $("#formProspectoZonaGestion_zonagestionnivel" + (1000 + i).toString().substr(1)).val("").trigger("change");
            }
            catch (e)
            {
                jsCustom.Funcion.showMessage("formProspectoZonaGestion .zonagestion: " + e.message);
            }
        });

        $(document).on("change", "#formProspectoCreate_tipoactividad, #formProspectoEdit_tipoactividad, #formProspectoCreate_campanaid, #formProspectoEdit_campanaid", function (e)
        {
            try
            {
                e.preventDefault();

                var campanaid = jsCustom.Funcion.getValidateDefault($("#" + jsProspecto.Variables.form + "_campanaid").val(), "");
                var tipoactividad = jsCustom.Funcion.getValidateDefault($("#" + jsProspecto.Variables.form + "_tipoactividad").val(), "");

                $("#" + jsProspecto.Variables.form + "_categoria").empty();

                if (campanaid == "" || tipoactividad == "")
                    return;

                jsCustom.Funcion.setDLLJSON(jsProspecto.Variables.urlListarCategoria, { campanaid: campanaid, tipoactividad: tipoactividad }, "#" + jsProspecto.Variables.form + "_categoria", "");

                $("#" + jsProspecto.Variables.form + "_categoria").val("").trigger("change");
            }
            catch (e)
            {
                jsCustom.Funcion.showMessage(jsProspecto.Variables.form + '_tipoactividad: ' + e.message);
            }
        });

        $(document).on("change", ".producto", function (e)
        {
            try
            {
                e.preventDefault();
                
                var iId = parseInt($(this).attr('id').replace(jsProspecto.Variables.form + "_productoid", ""));
                var value = jsCustom.Funcion.getValidateDefault($(this).val(), "");

                for (var i = iId + 1; i <= jsProspecto.Variables.nivelesproducto; i++)
                    $("#" + jsProspecto.Variables.form + "_productoid" + (1000 + i).toString().substr(1)).empty();

                if (value != "")
                    jsCustom.Funcion.setDLLJSON(jsProspecto.Variables.urlListarProducto, { nivel: jsProspecto.Variables.nivelproducto + (1001 + iId).toString().substr(1), nivelsuperiorid: value }, "#" + jsProspecto.Variables.form + "_productoid" + (1001 + iId).toString().substr(1), null);
                
                $("#" + jsProspecto.Variables.form + "_productoid" + (1000 + i).toString().substr(1)).val("").trigger("change");
            }
            catch (e)
            {
                jsCustom.Funcion.showMessage("formProspecto .producto: " + e.message);
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

                jsProspecto.Variables.mapa = custom;

                ctrlq();
        
                $("#modalMapa").modal('show');
            }
            catch (e)
            {
                jsCustom.Funcion.showMessage('btnMap: ' + e.message);
            }
        });        

        $(document).on("click", '.btnDireccionDelete', function (e)
        {
            e.preventDefault();

            var prospectoid = "";

            if (jsProspecto.Variables.form == "formProspectoEdit")
                prospectoid = $("#formProspectoEdit_id").val();

            var id = jsCustom.Funcion.getValidate($(this).closest('tr'), "id", null, "data", "string");
            var idref = jsCustom.Funcion.getValidate($(this).closest('tr'), "idref", null, "data", "string");
            var direcciones = $("#" + jsProspecto.Variables.form + "_direcciones").val();
            var custom01 = jsCustom.Funcion.getObjectJSON(jsProspecto.Variables.urlDireccionBorrar, { prospectoid: prospectoid, id: id, idref: idref, direcciones: direcciones });

            $("#" + jsProspecto.Variables.form + "_direcciones").val("");

            if (custom01 != null)
                $("#" + jsProspecto.Variables.form + "_direcciones").val(custom01);

            jsProspecto.Funcion.getDirecciones();
        });

        $(document).on("click", '.btnDireccionEdit', function (e)
        {
            e.preventDefault();

            var id = jsCustom.Funcion.getValidate($(this).closest('tr'), "id", null, "data", "string");
            var idref = jsCustom.Funcion.getValidate($(this).closest('tr'), "idref", null, "data", "string");
            var direcciones = $("#" + jsProspecto.Variables.form + "_direcciones").val();
            var data = jsCustom.Funcion.getJSON(jsProspecto.Variables.urlDireccionObtener, { id: id, idref: idref, direcciones: direcciones });

            if (data.ok)
            {
                if (data.result != null)
                {
                    if (data.result.isError == "N")
                    {
                        $("#" + jsProspecto.Variables.form + "_direcciones").val("");

                        if (data.result.custom01 != null)
                            $("#" + jsProspecto.Variables.form + "_direcciones").val(data.result.custom01);

                        if (data.result.custom02 != null)
                        {
                            var obj = data.result.custom02;
                            var ubigeo = obj.ubigeo.codigo.split("|");

                            $("#formProspectoDireccion_tipo").val(obj.tipo.codigo).trigger("change");
                            $("#formProspectoDireccion_direccion").val(obj.direccion);
                            $("#formProspectoDireccion_ubigeonivelsuperiorid001").val(ubigeo[0]).trigger("change");
                            $("#formProspectoDireccion_ubigeonivelsuperiorid002").val(ubigeo[1]).trigger("change");
                            $("#formProspectoDireccion_ubigeonivelsuperiorid003").val(ubigeo[2]).trigger("change");
                            $("#formProspectoDireccion_latitud").val(obj.latitud);
                            $("#formProspectoDireccion_longitud").val(obj.longitud);
                        }

                        jsProspecto.Funcion.getDirecciones();
                    }
                }
            }
        });

        $(document).on("click", '.btnZonaGestionDelete', function (e)
        {
            e.preventDefault();

            var prospectoid = "";

            if (jsProspecto.Variables.form == "formProspectoEdit")
                prospectoid = $("#formProspectoEdit_id").val();

            var id = jsCustom.Funcion.getValidate($(this).closest('tr'), "id", null, "data", "string");
            var idref = jsCustom.Funcion.getValidate($(this).closest('tr'), "idref", null, "data", "string");
            var zonasgestion = $("#" + jsProspecto.Variables.form + "_zonasgestion").val();
            var custom01 = jsCustom.Funcion.getObjectJSON(jsProspecto.Variables.urlZonaGestionBorrar, { prospectoid: prospectoid, id: id, idref: idref, zonasgestion: zonasgestion });

            $("#" + jsProspecto.Variables.form + "_zonasgestion").val("");

            if (custom01 != null)
                $("#" + jsProspecto.Variables.form + "_zonasgestion").val(custom01);

            jsProspecto.Funcion.getZonasGestion();
        });

        $(document).on("click", '.btnZonaGestionEdit', function (e)
        {
            e.preventDefault();

            var id = jsCustom.Funcion.getValidate($(this).closest('tr'), "id", null, "data", "string");
            var idref = jsCustom.Funcion.getValidate($(this).closest('tr'), "idref", null, "data", "string");
            var zonasgestion = $("#" + jsProspecto.Variables.form + "_zonasgestion").val();
            var data = jsCustom.Funcion.getJSON(jsProspecto.Variables.urlZonaGestionObtener, { id: id, idref: idref, zonasgestion: zonasgestion });

            if (data.ok)
            {
                if (data.result != null)
                {
                    if (data.result.isError == "N")
                    {
                        $("#" + jsProspecto.Variables.form + "_zonasgestion").val("");

                        if (data.result.custom01 != null)
                            $("#" + jsProspecto.Variables.form + "_zonasgestion").val(data.result.custom01);

                        if (data.result.custom02 != null)
                        {
                            var obj = data.result.custom02;
                            var zonagestion = obj.zonagestion.codigo.split("|");

                            $("#formProspectoZonaGestion_fuerzacomercialid").val(obj.fuerzacomercial.id).trigger("change");
                            $("#formProspectoZonaGestion_zonagestionnivel001").val(zonagestion[0]).trigger("change");
                            $("#formProspectoZonaGestion_zonagestionnivel002").val(zonagestion[1]).trigger("change");
                        }

                        jsProspecto.Funcion.getZonasGestion();
                    }
                }
            }
        });
        
        $(document).on("click", '.btnArchivoDelete', function (e)
        {
            e.preventDefault();

            var prospectoid = "";

            if (jsProspecto.Variables.form == "formProspectoEdit")
                prospectoid = $("#formProspectoEdit_id").val();

            var id = jsCustom.Funcion.getValidate($(this).closest('tr'), "id", null, "data", "string");
            jsCustom.Funcion.getObjectJSON(jsProspecto.Variables.urlArchivoBorrar, { id: id });

            jsProspecto.Funcion.getArchivos();
        });

        $("input[type='checkbox']").on('ifChecked', function (e)
        {
            e.preventDefault();

            var id = jsCustom.Funcion.getValidateDefault($(this).attr('id'), "");

            if (id == jsProspecto.Variables.form + "_crearactividad")
                jsProspecto.Funcion.setActividad(true);
        });

        $("input[type='checkbox']").on('ifUnchecked', function (e)
        {
            e.preventDefault();

            var id = jsCustom.Funcion.getValidateDefault($(this).attr('id'), "");

            if (id == jsProspecto.Variables.form + "_crearactividad")
                jsProspecto.Funcion.setActividad(false);
        });

    }
}

jsProspecto.Variables =
{
    seleccionar: "",
    tipopersona: "",
    nivelubigeo: "",
    nivelzonagestion: "",
    nivelproducto: "",
    niveles: 0,
    niveleszonagestion: 0,
    nivelesproducto: 0,
    urlListarUbigeo: "",
    urlListarZonaGestion: "",
    urlListarProducto: "",
    urlListarCategoria: "",
    urlListarDireccion: "",
    urlListarZonaGestionProspecto: "",
    defaultLatitud: "",
    defaultLongitud: "",
    mapaTitulo: "",
    mapaInformacion: "",
    mapaMessageQuery: "",
    mapaMessageGoogleError: "",
    mapaMessageAutoCompleteError: "",
    urlDireccionListar: "",
    urlDireccionBorrar: "",
    urlDireccionObtener: "",
    urlZonaGestionListar: "",
    urlZonaGestionBorrar: "",
    urlZonaGestionObtener: "",
    urlArchivoListar: "",
    urlArchivoBorrar: "",
    urlArchivoObtener: "",
    form: "",
    mapa: "",
}

jsProspecto.Funcion =
{
    onLoadCreate: function ()
    {
        jsCustom.Default.setPanel();

        jsProspecto.Variables.form = "formProspectoCreate";

        $("#" + jsProspecto.Variables.form + "_tipo").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        $("#" + jsProspecto.Variables.form + "_tipoidentificacion").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        $("#" + jsProspecto.Variables.form + "_estadocivil").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        $("#" + jsProspecto.Variables.form + "_sexo").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        $("#" + jsProspecto.Variables.form + "_tiponegocio").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        $("#" + jsProspecto.Variables.form + "_asesorid").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", allowClear: true });

        $("#formProspectoDireccion_tipo").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        $("#formProspectoDireccion_ubigeonivelsuperiorid001").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", allowClear: true });
        $("#formProspectoDireccion_ubigeonivelsuperiorid002").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", allowClear: true });
        $("#formProspectoDireccion_ubigeonivelsuperiorid003").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", allowClear: true });
        $("#formProspectoDireccion").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formProspectoDireccion"));

        $("#formProspectoZonaGestion_fuerzacomercialid").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", allowClear: true });
        $("#formProspectoZonaGestion_zonagestionnivel001").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", allowClear: true });
        $("#formProspectoZonaGestion_zonagestionnivel002").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", allowClear: true });
        $("#formProspectoZonaGestion").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formProspectoZonaGestion"));

        $("#" + jsProspecto.Variables.form + "_campanaid").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", allowClear: true });
        $("#" + jsProspecto.Variables.form + "_tipoactividad").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        $("#" + jsProspecto.Variables.form + "_categoria").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        $("#" + jsProspecto.Variables.form + "_direccion").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", allowClear: true });
        $("#" + jsProspecto.Variables.form + "_zonagestionid").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", allowClear: true });
        $("#" + jsProspecto.Variables.form + "_productoid001").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", allowClear: true });
        $("#" + jsProspecto.Variables.form + "_productoid002").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", allowClear: true });
        
        jsCustom.Funcion.setDatePicker("#" + jsProspecto.Variables.form + "_fechaactividad", "top");

        jsProspecto.init();
        iCheckMain.init();

        $("#" + jsProspecto.Variables.form + "_tipo").trigger("change");

        this.getDirecciones();
        this.getZonasGestion();

        var isChecked = $("#" + jsProspecto.Variables.form + "_crearactividad").prop("checked");
        this.setActividad(isChecked);

        $("#" + jsProspecto.Variables.form + "_tipoactividad").trigger("change");
        $("#" + jsProspecto.Variables.form + "_productoid001").trigger("change");
        $("#" + jsProspecto.Variables.form + "_categoria").val($("#" + jsProspecto.Variables.form + "_categoriaaux").val()).trigger("change");
        $("#" + jsProspecto.Variables.form + "_direccion").val($("#" + jsProspecto.Variables.form + "_direccionaux").val()).trigger("change");
        $("#" + jsProspecto.Variables.form + "_zonagestionid").val($("#" + jsProspecto.Variables.form + "_zonagestionidaux").val()).trigger("change");
        $("#" + jsProspecto.Variables.form + "_productoid002").val($("#" + jsProspecto.Variables.form + "_productoid002aux").val()).trigger("change");

        jsCustom.item.jsObject = this;
    },
    
    onLoadEdit: function (isAdministradorSistema)
    {
        jsCustom.Default.setPanel();

        jsProspecto.Variables.form = "formProspectoEdit";

        $("#" + jsProspecto.Variables.form + "_tipo").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        $("#" + jsProspecto.Variables.form + "_tipoidentificacion").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        $("#" + jsProspecto.Variables.form + "_estadocivil").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        $("#" + jsProspecto.Variables.form + "_sexo").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        $("#" + jsProspecto.Variables.form + "_tiponegocio").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        $("#" + jsProspecto.Variables.form + "_asesorid").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", allowClear: true });

        $("#formProspectoDireccion_tipo").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        $("#formProspectoDireccion_ubigeonivelsuperiorid001").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", allowClear: true });
        $("#formProspectoDireccion_ubigeonivelsuperiorid002").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", allowClear: true });
        $("#formProspectoDireccion_ubigeonivelsuperiorid003").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", allowClear: true });
        $("#formProspectoDireccion").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formProspectoDireccion"));

        $("#formProspectoZonaGestion_fuerzacomercialid").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", allowClear: true });
        $("#formProspectoZonaGestion_zonagestionnivel001").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", allowClear: true });
        $("#formProspectoZonaGestion_zonagestionnivel002").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", allowClear: true });
        $("#formProspectoZonaGestion").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formProspectoZonaGestion"));

        $("#formProspectoArchivo_clasificacion").select2({ placeholder: jsProspecto.Variables.seleccionar + "...", minimumResultsForSearch: Infinity, allowClear: true });
        $("#formProspectoArchivo").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formProspectoArchivo"));

        jsProspecto.init();

        $("#" + jsProspecto.Variables.form + "_tipo").trigger("change");

        this.getDirecciones();
        this.getZonasGestion();
        this.getArchivos();

        jsCustom.item.jsObject = this;
    },
    
    setFormSubmit: function (form)
    {
        if (form == "formProspectoDireccion")
        {
            $("#formProspectoDireccion_prospectoid").val("");

            if (jsProspecto.Variables.form == "formProspectoEdit")
                $("#formProspectoDireccion_prospectoid").val($("#formProspectoEdit_id").val());

            $("#formProspectoDireccion_tiponame").val($("#formProspectoDireccion_tipo option:selected").text());
            $("#formProspectoDireccion_direcciones").val($("#" + jsProspecto.Variables.form + "_direcciones").val());
        }

        if (form == "formProspectoZonaGestion")
        {
            $("#formProspectoZonaGestion_prospectoid").val("");

            if (jsProspecto.Variables.form == "formProspectoEdit")
                $("#formProspectoZonaGestion_prospectoid").val($("#formProspectoEdit_id").val());

            $("#formProspectoZonaGestion_fuerzacomercialidname").val($("#formProspectoZonaGestion_fuerzacomercialid option:selected").text());

            var zonagestion = $("#formProspectoZonaGestion_zonagestionnivel001 option:selected").text();
            zonagestion += ' | ' + $("#formProspectoZonaGestion_zonagestionnivel002 option:selected").text();
            
            $("#formProspectoZonaGestion_zonagestionidname").val(zonagestion);
            $("#formProspectoZonaGestion_zonasgestion").val($("#" + jsProspecto.Variables.form + "_zonasgestion").val());
        }

        if (form == "formProspectoArchivo")
        {
            $("#formProspectoArchivo_fecha").val(this.getFileDate());
            $("#formProspectoArchivo_prospectoid").val($("#formProspectoEdit_id").val());
        }
        
        if (form == "formProspectoCreate" || form == "formProspectoEdit")
        {
            if ($("#" + form).valid())
            {
                var url = $("#" + form).attr("action");

                if (form == "formProspectoCreate")
                    url = url + "Valid";

                if (form == "formProspectoEdit")
                    url = url.replace("Edit", "EditValid");

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

        if (formId == "formProspectoDireccion")
        {
            $("#formProspectoDireccion_tipo").val("").trigger("change");
            $("#formProspectoDireccion_direccion").val("");
            $("#formProspectoDireccion_ubigeonivelsuperiorid001").val("").trigger("change");
            $("#formProspectoDireccion_latitud").val("");
            $("#formProspectoDireccion_longitud").val("");

            $("#" + jsProspecto.Variables.form + "_direcciones").val("");

            if (data.custom01 != null)
                $("#" + jsProspecto.Variables.form + "_direcciones").val(data.custom01);

            this.getDirecciones();

            return;
        }

        if (formId == "formProspectoZonaGestion")
        {
            $("#formProspectoZonaGestion_fuerzacomercialid").val("").trigger("change");
            $("#formProspectoZonaGestion_zonagestionnivel001").val("").trigger("change");

            $("#" + jsProspecto.Variables.form + "_zonasgestion").val("");

            if (data.custom01 != null)
                $("#" + jsProspecto.Variables.form + "_zonasgestion").val(data.custom01);

            this.getZonasGestion();

            return;
        }

        if (formId == "formProspectoArchivo")
        {
            $("#formProspectoArchivo_nombre").val("");
            $("#formProspectoArchivo_clasificacion").val("").trigger("change");
            $("#formProspectoArchivo_latitud").val("");
            $("#formProspectoArchivo_longitud").val("");
            document.getElementById('formProspectoArchivo_file').value = null;

            this.getArchivos();

            return;
        }
    },

    getDirecciones: function ()
    {
        var id = "";

        if (jsProspecto.Variables.form == "formProspectoEdit")
            id = $("#formProspectoEdit_id").val();

        var direcciones = $("#" + jsProspecto.Variables.form + "_direcciones").val();
        var html = jsCustom.Funcion.getObjectJSON(jsProspecto.Variables.urlDireccionListar, { prospectoid: id, direcciones: direcciones });

        if (html != null)
            $("#divDirecciones").html(html);

        var valuedireccion = $("#" + jsProspecto.Variables.form + "_direccion").val();

        $("#" + jsProspecto.Variables.form + "_direccion").empty();

        if (jsProspecto.Variables.form == "formProspectoCreate")
            jsCustom.Funcion.setDLLJSON(jsProspecto.Variables.urlListarDireccion, { prospectoid: id, direcciones: direcciones }, "#" + jsProspecto.Variables.form + "_direccion", "");
        
        $("#" + jsProspecto.Variables.form + "_direccion").val("").trigger("change");
        $("#" + jsProspecto.Variables.form + "_direccion").val(valuedireccion).trigger("change");
    },

    getZonasGestion: function ()
    {
        var id = "";

        if (jsProspecto.Variables.form == "formProspectoEdit")
            id = $("#formProspectoEdit_id").val();

        var zonasgestion = $("#" + jsProspecto.Variables.form + "_zonasgestion").val();
        var html = jsCustom.Funcion.getObjectJSON(jsProspecto.Variables.urlZonaGestionListar, { prospectoid: id, zonasgestion: zonasgestion });

        if (html != null)
            $("#divZonasGestion").html(html);

        var valuezonagestion = $("#" + jsProspecto.Variables.form + "_zonagestionid").val();

        $("#" + jsProspecto.Variables.form + "_zonagestionid").empty();
        
        jsCustom.Funcion.setDLLJSON(jsProspecto.Variables.urlListarZonaGestionProspecto, { prospectoid: id, zonasgestion: zonasgestion }, "#" + jsProspecto.Variables.form + "_zonagestionid", null);

        $("#" + jsProspecto.Variables.form + "_zonagestionid").val("").trigger("change");
        $("#" + jsProspecto.Variables.form + "_zonagestionid").val(valuezonagestion).trigger("change");
    },

    getArchivos: function ()
    {
        var id = $("#formProspectoEdit_id").val();        
        var html = jsCustom.Funcion.getObjectJSON(jsProspecto.Variables.urlArchivoListar, { prospectoid: id });

        if (html != null)
            $("#divArchivos").html(html);

        $('.image-popup-vertical-fit').magnificPopup({ type: 'image', closeOnContentClick: true, mainClass: 'mfp-img-mobile', image: { verticalFit: true } });
    },

    getFileDate: function ()
    {
        var x = document.getElementById("formProspectoArchivo_file");

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

    setActividad: function (isEnabled)
    {
        $("#" + jsProspecto.Variables.form + "_fechaactividad").prop("readonly", !(isEnabled));
        $("#" + jsProspecto.Variables.form + "_descripcionactividad").prop("readonly", !(isEnabled));

        if (isEnabled)
        {
            $("#" + jsProspecto.Variables.form + "_campanaid").select2({ disabled: false });
            $("#" + jsProspecto.Variables.form + "_tipoactividad").select2({ disabled: false });
            $("#" + jsProspecto.Variables.form + "_categoria").select2({ disabled: false });
            $("#" + jsProspecto.Variables.form + "_direccion").select2({ disabled: false });
            $("#" + jsProspecto.Variables.form + "_zonagestionid").select2({ disabled: false });
            $("#" + jsProspecto.Variables.form + "_productoid001").select2({ disabled: false });
            $("#" + jsProspecto.Variables.form + "_productoid002").select2({ disabled: false });
        }
        else
        {
            $("#" + jsProspecto.Variables.form + "_campanaid").val("").trigger("change");
            $("#" + jsProspecto.Variables.form + "_fechaactividad").val("");
            $("#" + jsProspecto.Variables.form + "_tipoactividad").val("").trigger("change");
            $("#" + jsProspecto.Variables.form + "_productoid001").val("").trigger("change");
            $("#" + jsProspecto.Variables.form + "_direccion").val("").trigger("change");

            $("#" + jsProspecto.Variables.form + "_campanaid").select2({ disabled: "readonly" });
            $("#" + jsProspecto.Variables.form + "_campanaid").select2({ disabled: "readonly" });
            $("#" + jsProspecto.Variables.form + "_tipoactividad").select2({ disabled: "readonly" });
            $("#" + jsProspecto.Variables.form + "_categoria").select2({ disabled: "readonly" });
            $("#" + jsProspecto.Variables.form + "_direccion").select2({ disabled: "readonly" });
            $("#" + jsProspecto.Variables.form + "_zonagestionid").select2({ disabled: "readonly" });
            $("#" + jsProspecto.Variables.form + "_productoid001").select2({ disabled: "readonly" });
            $("#" + jsProspecto.Variables.form + "_productoid002").select2({ disabled: "readonly" });
        }
    },

};
