if (typeof (jsCustom) == "undefined")
{
    jsCustom = {};
}

jsCustom.item =
{
    jsObject: null,
    titleDelete: "",
    titleDisabled: "",
    messageDelete: "",
    messageDisabled: ""
};

jsCustom.Default =
{
    init: function ()
    {
        $(document).on("click", '.btnURL', function (e) { e.preventDefault(); jsCustom.Funcion.goURL($(this)); });
        $(document).on("click", '.btnURLTable', function (e) { e.preventDefault(); jsCustom.Funcion.hideMessage(); jsCustom.Funcion.goURLTable($(this)); });

        $(document).on("click", '.btnForm', function (e) { e.preventDefault(); jsCustom.Funcion.hideMessage(); jsCustom.Funcion.submitForm($(this)); });

        $(document).on("click", '.btnModal', function (e) { e.preventDefault(); jsCustom.Funcion.hideMessage(); jsCustom.Funcion.showModal($(this)); });
        $(document).on("click", '.btnModalDetail', function (e) { e.preventDefault(); jsCustom.Funcion.hideMessage(); jsCustom.Funcion.showModalDetail($(this)); });

        $(document).on("click", '.btnModalDelete', function (e) { e.preventDefault(); jsCustom.Funcion.hideMessage(); jsCustom.Funcion.showModalDelete($(this)); });
        $(document).on("click", '.btnDeleteItem', function (e) { e.preventDefault(); jsCustom.Funcion.setDeleteItem($(this)); });
        
        $(document).on("click", '.btnPagination', function (e) { e.preventDefault(); jsCustom.Funcion.setPage($(this)); });
        $(document).on("click", '.btnSortTable', function (e) { e.preventDefault(); jsCustom.Funcion.setOrder($(this)); });

        $(document).on("click", '.btnClearFile', function (e) { e.preventDefault(); jsCustom.Funcion.setClearFile($(this)); });

        $(document).on("click", '.btnRefresh', function (e) { e.preventDefault(); jsCustom.Funcion.setRefresh($(this)); });

        $(document).on("click", '.tdShow, .spanHover', function (e) { e.preventDefault(); jsCustom.Funcion.getShowRow($(this)); });
    },

    setPanel: function ()
    {
        $(document).on("click", '.panel-tools .panel-collapse', function (e)
        {
            e.preventDefault();

            var el = jQuery(this).parent().closest(".panel").children(".panel-body");

            if ($(this).hasClass("collapses"))
            {
                $(this).addClass("expand").removeClass("collapses");

                el.slideUp(200);
            }
            else
            {
                $(this).addClass("collapses").removeClass("expand");

                el.slideDown(200);
            }
        });

        $(document).on("click", '.panel-tools .panel-expand', function (e)
        {
            $('.panel-tools a').not(this).hide();
            $('body').append('<div class="full-white-backdrop"></div>');
            $('.main-container').removeAttr('style');

            backdrop = $('.full-white-backdrop');
            wbox = $(this).parents('.panel');
            wbox.removeAttr('style');

            if (wbox.hasClass('panel-full-screen'))
            {
                backdrop.fadeIn(200, function ()
                {
                    $('.panel-tools a').show();

                    wbox.removeClass('panel-full-screen');
                    backdrop.fadeOut(200, function () { backdrop.remove(); });
                });
            }
            else
            {
                $('body').append('<div class="full-white-backdrop"></div>');

                backdrop.fadeIn(200, function ()
                {
                    $('.main-container').css({'max-height': $(window).outerHeight() - $('header').outerHeight() - $('.footer').outerHeight() - 100, 'overflow': 'hidden'});

                    backdrop.fadeOut(200);
                    backdrop.remove();
                    wbox.addClass('panel-full-screen').css({'max-height': $(window).height(), 'overflow': 'auto'});
                });
            }
        });
    }
};

jsCustom.Funcion =
{
    // ajax
    getOptionsAjaxForm: function (obj, formId) 
    {
        var options =
        {
            async: false,
            cache: false,
            dataType: 'json',
            success: function (data, status, xhr)
            {
                obj.successForm(formId, data);
            },
            error: function (data, status, xhr)
            {
                jsCustom.Funcion.showErrorAjax(data, status, xhr);
            }
        };

        return options;
    },

    showErrorAjax: function (data, status, xhr)
    {
        var message = "";

        if (data.status === 0)
        {
            message = 'Not connect.<br /> Verify Network.';
        }
        else if (data.status == 404)
        {
            message = 'Requested page not found. [404]';
        }
        else if (data.status == 500)
        {
            message = 'Internal Server Error [500].';
        }
        else if (status === 'parsererror')
        {
            message = 'Requested JSON parse failed.';
        }
        else if (status === 'timeout')
        {
            message = 'Time out error.';
        }
        else if (status === 'abort')
        {
            message = 'Ajax request aborted.';
        }
        else
        {
            message = 'Uncaught Error. <br />' + jqXHR.responseText;
        }

        this.showMessage(message);
    },
    
    // get json
    getJSON: function (url, data)
    {
        var obj = null;

        $.ajax(
        {
            async: false,
            cache: false,
            type: 'POST',
            dataType: "json",
            url: url,
            data: data,
            success:
                function (data, status, xhr)
                {
                    obj = { ok: true, result: data, status: status, xhr: xhr };
                },
            error:
                function (data, status, xhr)
                {
                    obj = { ok: false, result: data, status: status, xhr: xhr };
                }
            });

        return obj;
    },
    
    // get json
    getJSONURL: function (url)
    {
        var obj = null;

        $.ajax(
        {
            async: false,
            cache: false,
            type: 'POST',
            dataType: "json",
            url: url,
            success:
                function (data, status, xhr)
                {
                    obj = { ok: true, result: data, status: status, xhr: xhr };
                },
            error:
                function (data, status, xhr)
                {
                    obj = { ok: false, result: data, status: status, xhr: xhr };
                }
            });

        return obj;
    },

    // set list to dropdownlist
    setDLLJSON: function (url, data, objectId, isNotId)
    {
        $.ajax(
        {
            async: false,
            cache: false,
            type: 'POST',
            dataType: "json",
            url: url,
            data: data,
            success:
                function (data, status, xhr)
                {
                    if (jsCustom.Funcion.getValidateDefault(data.isError, "") == "N")
                    {
                        $(objectId).append('<option value=""></option>');

                        for (var i = 0; i < data.lstBE.length; i++)
                        {
                            if (isNotId != null)
                                $(objectId).append('<option value="' + data.lstBE[i].codigo + '">' + data.lstBE[i].nombre + '</option>');
                            else
                                $(objectId).append('<option value="' + data.lstBE[i].id + '">' + data.lstBE[i].nombre + '</option>');
                        }
                    }
                    else
                        jsCustom.Funcion.showMessage(data.message);
                },
            error:
                function (data, status, xhr)
                {
                    jsCustom.Funcion.showErrorAjax(data, status, xhr);
                }
        });
    },

    // set list to dropdownlist
    getObjectJSON: function (url, data)
    {
        var objBE = null;

        $.ajax(
        {
            async: false,
            cache: false,
            type: 'POST',
            dataType: "json",
            url: url,
            data: data,
            success:
                function (data, status, xhr)
                {
                    if (jsCustom.Funcion.getValidateDefault(data.isError, "") == "N")
                        objBE = data.custom01;
                    else
                        jsCustom.Funcion.showMessage(data.message);
                },
            error:
                function (data, status, xhr)
                {
                    jsCustom.Funcion.showErrorAjax(data, status, xhr);
                }
        });

        return objBE;
    },

    getJSONProcess: function (url, data)
    {
        var error = "";

        $.ajax({
            async: false,
            cache: false,
            type: 'POST',
            dataType: 'json',
            url: url,
            beforeSend: function ()
            {
                $('.ajax-loader').css("visibility", "visible");
                $('.ajax-loader').show();
            },
            success: function (data)
            {
                if (jsCustom.Funcion.getValidateDefault(data.isError, "") == "S")
                    error = data.message;
            },
            complete: function ()
            {
                $('.ajax-loader').css("visibility", "hidden");
                $('.ajax-loader').hide();
            }
        });

        return error;
    },
    
    // get valid in Create, Edit previous submit form
    getValidSave: function (url, data)
    {
        var isOK = false;
        var obj = this.getJSON(url, data);

        if (obj.ok)
        {
            if (jsCustom.Funcion.getValidateDefault(obj.result.isError, "") == "N")
                isOK = true;
            else
                jsCustom.Funcion.showMessage(obj.result.message);
        }
        else
            jsCustom.Funcion.showErrorAjax(obj.result, obj.status, obj.xhr);

        return isOK;
    },

    // modal
    showMessage: function (message)
    {
        message = this.getValidateDefault(message, "");

        if (message != "")
        {
            $('#pMessageContent').html(message);
            $('#modalMessage').modal('show');
        }
    },
    
    showModal: function (obj)
    {
        var isOK = true;
        var modal = this.getValidate(obj, "modal", null, "data", "string");
        
        if (modal == null)
            return;

        var custom = this.getValidate(obj, "custom", null, "data", "string");

        if (custom != null)
        {
            if (jsCustom.item.jsObject != null)
                isOK = jsCustom.item.jsObject.setCustomModal(obj, custom);
        }

        if (isOK)
            $('#' + modal).modal('show');
    },

    showModalDelete: function (obj)
    {
        var url = this.getValidate(obj, "url", null, "data", "string");
        var idEntity = this.getValidate(obj.closest('tr'), "id", null, "data", "string");
        var urlAction = this.getValidate(obj.closest('tr').parent().parent(), url, null, "data", "string");
        var name = this.getValidate(obj.closest('tr'), "name", null, "data", "string");
        var custom = this.getValidate(obj, "custom", "", "data", "string");

        if (url == null || idEntity == null || urlAction == null || name == null)
            return;

        var isOK = true;

        if (this.getValidate(obj, "valid", "", "data", "string") == "s")
        {
            var obj = this.getJSONURL(urlAction + "ValidView/" + idEntity);

            if (obj.ok)
            {
                if (jsCustom.Funcion.getValidateDefault(obj.result.isError, "") == "S")
                {
                    jsCustom.Funcion.showMessage(obj.result.message);

                    isOK = false;
                }
            }
            else
            {
                jsCustom.Funcion.showErrorAjax(obj.result, obj.status, obj.xhr);

                isOK = false;
            }
        }

        if (!(isOK))
            return;

        var item = { title: jsCustom.item.titleDelete, message: jsCustom.item.messageDelete };

        if (url == "disabled")
        {
            item.title = jsCustom.item.titleDisabled;
            item.message = jsCustom.item.messageDisabled;
        }

        if (custom != "")
        {
            item = jsCustom.item.jsObject.setMessage(custom, item);
        }

        custom = url;

        $('#modalDeleteItem_btnOK').data("id", idEntity);
        $('#modalDeleteItem_btnOK').data("url", urlAction);
        $('#modalDeleteItem_btnOK').data("custom", custom);
        $('#modalDeleteItem_pTitle').html(item.title);
        $('#modalDeleteItem_pMessage').html(item.message);
        $('#modalDeleteItem_pName').html(name);
        $('#modalDeleteItem').modal('show');
    },

    showModalDetail: function (obj)
    {
        var url = this.getValidate(obj, "url", null, "data", "string");
        var idEntity = this.getValidate(obj.closest('tr'), "id", null, "data", "string");
        var urlCustom = this.getValidate(obj, "customurl", "", "data", "string");
        var urlAction = this.getValidate(obj.closest('tr').parent().parent(), url, null, "data", "string");
        var objBE = null;

        if (url == null || idEntity == null || urlAction == null)
            return;

        var isOK = true;
        
        if (this.getValidate(obj, "valid", "", "data", "string") == "s")
        {
            var obj = this.getJSONURL(urlAction + "ValidView/" + idEntity);

            if (obj.ok)
            {
                if (jsCustom.Funcion.getValidateDefault(obj.result.isError, "") == "S")
                {
                    jsCustom.Funcion.showMessage(obj.result.message);

                    isOK = false;
                }
            }
            else
            {
                jsCustom.Funcion.showErrorAjax(obj.result, obj.status, obj.xhr);

                isOK = false;
            }
        }
        
        if (!(isOK))
            return;

        var objBE = this.getObjectJSON(urlAction + urlCustom, { id: idEntity });
        
        if (objBE != null)
            jsCustom.item.jsObject.setEntityItem(url, objBE);
    },

    // url
    goURL: function (obj)
    {
        var url = this.getValidate(obj, "url", null, "data", "string");
        
        if (url == null)
            return;
        
        this.sendURL(url);
    },

    sendURL: function (url)
    {
        window.location.href = url;
    },

    goURLTable: function (obj)
    {
        var url = this.getValidate(obj, "url", null, "data", "string");
        var idEntity = this.getValidate(obj.closest('tr'), "id", null, "data", "string");
        var idCustom = this.getValidate(obj, "idcustom", null, "data", "string");
        var urlShow = this.getValidate(obj.closest('tr').parent().parent(), url, null, "data", "string");
        
        if (url == null || idEntity == null || urlShow == null)
            return;
                    
        if (this.getValidate(obj, "valid", "", "data", "string") == "s") {
            $.ajax(
                {
                    async: false,
                    cache: false,
                    dataType: "json",
                    type: 'POST',
                    url: urlShow + "ValidView/" + idEntity,
                    success: function (data, status, xhr) {
                        if (jsCustom.Funcion.getValidateDefault(data.isError, "") == "N")
                            jsCustom.Funcion.sendURL(urlShow + "/" + idEntity);
                        else
                            jsCustom.Funcion.showMessage(data.message);
                    },
                    error: function (data, status, xhr) {
                        jsCustom.Funcion.showErrorAjax(data, status, xhr);
                    }
                });
        }
        else
        {
            if (idCustom != null)
                idEntity = idCustom;

            this.sendURL(urlShow + "/" + idEntity);
        }
    },

    // form
    submitForm: function (obj)
    {
        var form = this.getValidate(obj, "form", null, "data", "string");

        if (form == null)
            return;
        
        if (jsCustom.item.jsObject != null)
        {
            if (!(jsCustom.item.jsObject.setFormSubmit(form)))
                return;
        }
        
        $('#' + form).submit();
    },

    setValueHiddenforInputForm: function (form)
    {
        $("form#" + form + " input[type=hidden]").each(function ()
        {
            var id = jsCustom.Funcion.getValidate($(this), "id", null, "attr", "string");
            
            if (id != null)
            {
                id = id.replace(form + "_", "").toLowerCase();

                if (id != "pagina")
                    $(this).val($('#' + form + '_' + id).val());
            }
        });
    },

    // pagination
    setPage: function (obj)
    {
        var form = this.getValidate(obj.closest('ul'), "form", null, "data", "string");
        var page = this.getValidate(obj, "page", null, "data", "string");
        var currentpage = this.getValidate(obj.closest('ul'), "currentpage", null, "data", "string");

        if (form == null || page == null || currentpage == null)
            return;

        if (page == "plus")
            page = currentpage + 1;
        else if (page == "minus")
            page = currentpage - 1;

        this.setValueHiddenforInputForm(form);

        $('#' + form + '_pagina').val(page);
        $('#' + form).submit();
    },

    setOrder: function (obj)
    {
        var form = this.getValidate(obj.closest('table'), "form", null, "data", "string");
        var column = this.getValidate(obj, "order", null, "data", "string");

        if (form == null || column == null)
            return;

        var typeorder = "";
        var classList = this.getValidate(obj, "classList", null, "prop", "");

        if (classList == null)
            return;

        for (var i = 0; i < classList.length; i++)
        {
            if (classList[i] == 'sorting')
                typeorder = "1";
            else if (classList[i] == 'sorting_asc')
                typeorder = "2";
            else if (classList[i] == 'sorting_desc')
                typeorder = "1";
        }

        if (typeorder == "")
            return;

        this.setValueHiddenforInputForm(form);

        $('#' + form + '_pagina').val("1");
        $('#' + form + '_tipoorden').val(typeorder);
        $('#' + form + '_columnaorden').val(column);
        $('#' + form).submit();
    },

    // config datatable
    setDataTable: function(idTable, columns, isSort)
    {
        try
        {
            $('#' + idTable).dataTable(
            {
                "bInfo": false, // activa la etiqueta del total de registros
                "bLengthChange": false, // desactiva el combo para cambiar el tamaño del paginamiento
                "iDisplayLength": 5, // muestra cuantos registros deben mostrarse en la tabla
                "bFilter": false, // desactiva la seccion de busqueda del plugin
                "bSort": isSort, // desactiva el ordenamiendo de las columnas
                "bPaginate": false, // activa la navegacion del paginamiento
                "bAutoWidth": false, // desactiva el redimensionamiento de la tabla
                "aoColumns": columns,
                "oLanguage": {
                    "sProcessing": "Procesando...",
                    "sLengthMenu": "Mostrar _MENU_ registros",
                    "sZeroRecords": "No se encontraron resultados a mostrar",
                    "sEmptyTable": "No se encontraron resultados a mostrar",
                    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "sInfoEmpty": "", //"Mostrando registros del 0 al 0 de un total de 0 registros",
                    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sSearch": "Buscar:",
                    "sUrl": "",
                    "sInfoThousands": ",",
                    "sLoadingRecords": "Cargando...",
                    "oPaginate": {
                        "sFirst": "Primero",
                        "sLast": "Último",
                        "sNext": "Siguiente",
                        "sPrevious": "Anterior"
                    },
                    "oAria": {
                        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                    }
                }
            });
        }
        catch (err)
        {
            alert('setDataTable: ' + err.message);
        }
    },

    setOrderTable: function (tableId, isOrderJS, tipoorden, columnaorden)
    {
        try
        {
            if (isOrderJS)
            {
                $("#" + tableId + " .btnSortTable").each(function () { $(this).removeClass("btnSortTable"); });

                return;
            }

            if (columnaorden != "" && tipoorden != "")
            {
                var order = "";

                $("#" + tableId + " .btnSortTable").each(function ()
                {
                    order = jsCustom.Funcion.getValidate($(this), "order", "", "data", "string");

                    if (order == columnaorden)
                    {
                        if (tipoorden == "1")
                            $(this).addClass('sorting_asc');
                        else
                            $(this).addClass('sorting_desc');
                    }
                    else
                        $(this).addClass('sorting');
                });
            }
        }
        catch (err)
        {
            alert('setOrderTable: ' + err.message);
        }
    },

    // validacion
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
            alert(err.message);

            return defaultValue;
        }
    },

    getValidateDefault: function (obj, defaultValue)
    {
        if (typeof (obj) == "undefined")
            return defaultValue;

        if (obj == null)
            return defaultValue;

        if (obj.trim() == "")
            return defaultValue;
        
        return obj;
    },

    clearInputText: function (form, arrayobjects, value)
    {
        for (var i = 0; i < arrayobjects.length; i++)
            $('#' + form + '_' + arrayobjects[i]).val(value);
    },

    // date time picker
    setDatePicker: function (id, position)
    {
        var fecha = $(id).val();
        
        if (fecha != null && fecha != '')
            fecha = moment(fecha, 'DD/MM/YYYY').format('MM/DD/YYYY');

        $(id).val('').datetimepicker({ format: 'dd/mm/yyyy', locale: 'es', useCurrent: false, defaultDate: fecha, widgetPositioning: { horizontal: 'left', vertical: position } });
    },
    
    setFormatDateJSON: function (jsondate, tipo)
    {
        if (jsondate == null)
            return "";

        var date = new Date(parseInt(jsondate.replace("/Date(", "").replace(")/", ""), 10));
        var formatdate = (("00" + date.getDate()).slice(-2) + "/" + ("00" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear());

        if (tipo != null)
        {
            if (tipo == 'mm')
                formatdate = (("00" + date.getDate()).slice(-2) + "/" + ("00" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear() + " " + ("00" + date.getHours()).slice(-2) + ":" + ("00" + date.getMinutes()).slice(-2));
            else
                formatdate = (("00" + date.getDate()).slice(-2) + "/" + ("00" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear() + " " + ("00" + date.getHours()).slice(-2) + ":" + ("00" + date.getMinutes()).slice(-2) + ":" + ("00" + date.getSeconds()).slice(-2));
        }
            
        return formatdate;
    },

    // detele item
    setDeleteItem: function (obj)
    {
        var id = this.getValidate(obj, "id", null, "data", "string");
        var url = this.getValidate(obj, "url", null, "data", "string");

        if (url == null || id == null)
            return;

        var custom = this.getValidate(obj, "custom", "", "data", "string");
        var datavalue = { id: id };

        $.ajax(
        {
            async: false,
            cache: false,
            dataType: "json",
            type: 'POST',
            url: url,
            data: datavalue,
            success: function (data, status, xhr)
            {
                $('#modalDeleteItem').modal('hide');

                if (jsCustom.Funcion.getValidateDefault(data.isError, "") == "N")
                {
                    if (custom != "")
                        jsCustom.item.jsObject.setDeleteItem(custom);
                }
                else
                    jsCustom.Funcion.showMessage(data.message);
            },
            error: function (data, status, xhr)
            {
                $('#modalDeleteItem').modal('hide');

                jsCustom.Funcion.showErrorAjax(data, status, xhr);
            }
        });
    },

    hideMessage: function ()
    {
        $("#divListMessage").hide();
    },
    
    setClearFile: function (obj)
    {
        var pathfile = this.getValidate(obj, "pathfileid", null, "data", "string");

        if (pathfile == null)
            return;
    
        $("#" + pathfile).val("");
    },

    setRefresh: function (obj)
    {
        var div = this.getValidate(obj, "div", null, "data", "string");

        if (div == null)
            return;

        if (jsCustom.item.jsObject != null)
            jsCustom.item.jsObject.setRefresh(obj, div);
    },

    getShowRow: function (obj)
    {
        var item = {};

        try
        {
            item.elementsA = $(obj).closest('tr').find('td:last-child').find('a');
            item.elementA = null;
            item.show = "";

            $.each($(item.elementsA), function () {
                item.show = jsCustom.Funcion.getValidate($(this), "url", "", "data", "string");

                if (item.show == "show")
                    item.elementA = $(this);
            });

            if (item.elementA != null)
                $(item.elementA).trigger("click");
        }
        catch (e)
        {

        }

        item = null;
    }

};
