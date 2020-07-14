if (typeof (jsResumenMes) == "undefined")
{
    jsResumenMes = {};
}

jsResumenMes.variable =
{
    urlFuerzaComercialTipoEstado: "",
    urlPendienteRetroalimentada: "",
    urlPosicionPendiente: "",
    urlPosicionRetroalimentada: "",
    campana: "",
    cliente: "",
    asesor: "",
    fecha: "",
    etiqueta: "",
    defaultLatitud: "",
    defaultLongitud: "",
    noinfo: "",
};

jsResumenMes.Funcion =
{
    onLoad: function ()
    {
        jsCustom.Default.setPanel();

        this.fuerzacomercialtipoestado();
        this.pendienteretroalimentada();
        this.mapapendiente();
        this.maparetroalimentada();
    },
    
    fuerzacomercialtipoestado: function ()
    {
        var ok = false;
        var result = jsCustom.Funcion.getJSONURL(jsResumenMes.variable.urlFuerzaComercialTipoEstado);

        if (result != null)
        {
            if (result.ok)
            {
                if (result.result != null)
                {
                    if (result.result.isError == "N")
                    {
                        var lstBE = result.result.custom01;
                        var lstFC = result.result.custom02;
                        var lstTipo = result.result.custom03;
                        var lstEstado = result.result.custom04;
                        var dataItem = [];

                        if (lstBE.length > 0)
                        {
                            ok = true;

                            for (var i2 = 0; i2 < lstTipo.length; i2++)
                            {
                                for (var i3 = 0; i3 < lstEstado.length; i3++)
                                {
                                    var dataValues = [];

                                    for (var i1 = 0; i1 < lstFC.length; i1++)
                                    {
                                        var value = 0;

                                        for (var i4 = 0; i4 < lstBE.length; i4++)
                                        {
                                            if (lstBE[i4][0].Value == lstFC[i1])
                                            {
                                                if (lstBE[i4][1].Value == lstTipo[i2])
                                                {
                                                    if (lstBE[i4][2].Value == lstEstado[i3])
                                                    {
                                                        value = lstBE[i4][3].Value;

                                                        break;
                                                    }
                                                }
                                            }
                                        }

                                        dataValues.push(value);
                                    }

                                    var cssColor = Math.floor(Math.random() * 16777215).toString(16);

                                    dataItem.push({
                                        label: lstTipo[i2] + ": " + lstEstado[i3],
                                        backgroundColor: "#" + cssColor,
                                        stack: lstTipo[i2],
                                        data: dataValues
                                    });
                                }
                            }
                            
                            var barChartData = {
                                labels: lstFC,
                                datasets: dataItem
                            };

                            var canvas = document.getElementById('divFuerzaComercialTipoEstado').getContext('2d');
                            window.bar = new Chart(canvas, {
                                type: 'bar',
                                data: barChartData,
                                options: {
                                    tooltips: {
                                        mode: 'index',
                                        intersect: false
                                    },
                                    responsive: true,
                                    scales: {
                                        xAxes: [{ stacked: true, }],
                                        yAxes: [{ stacked: true }]
                                    }
                                }
                            });
                        }
                    }
                }
            }
        }

        if (ok)
        {
            $("#divFuerzaComercialTipoEstado").show();
            $("#divFuerzaComercialTipoEstadoEmpty").hide();
        }
        else
        {
            $("#divFuerzaComercialTipoEstado").hide();
            $("#divFuerzaComercialTipoEstadoEmpty").html("<table style='width: 100%; height: 287px;'><tr><td valign='middle' align='center'>" + jsResumenDia.variable.noinfo + "</td></tr></table>");
            $("#divFuerzaComercialTipoEstadoEmpty").show();
        }
    },
    
    pendienteretroalimentada: function ()
    {
        var result = jsCustom.Funcion.getJSONURL(jsResumenMes.variable.urlPendienteRetroalimentada);

        if (result != null)
        {
            if (result.ok)
            {
                if (result.result != null)
                {
                    if (result.result.isError == "N")
                    {
                        var lstBE = result.result.custom01;
                        var data = [];
                        var label = [];
                        var color = [];

                        for (var i = 0; i < lstBE.length; i++)
                        {
                            var cssColor = Math.floor(Math.random() * 16777215).toString(16);

                            label.push(lstBE[i][0].Value);
                            data.push(lstBE[i][1].Value);

                            if (i == 0)
                                color.push("#F7464A");
                            else if (i == 1)
                                color.push("#FFD700");
                            else if (i == 2)
                                color.push("#B8860B");
                            else if (i == 3)
                                color.push("#808000");
                        }

                        var datos = {
                            type: "pie",
                            data: {
                                datasets: [{
                                    data: data,
                                    backgroundColor: color
                                }],
                                labels: label
                            },
                            options: {
                                responsive: true,
                            }
                        };

                        var canvas = document.getElementById('divPendienteRetroalimentada').getContext('2d');
                        window.pie = new Chart(canvas, datos);
                    }
                }
            }
        }
    },
    
    mapapendiente: function ()
    {
        var result = jsCustom.Funcion.getJSONURL(jsResumenMes.variable.urlPosicionPendiente);

        if (result != null)
        {
            if (result.ok)
            {
                if (result.result != null)
                {
                    if (result.result.isError == "N")
                        this.posicion(result.result.custom01, 'divMapaPendiente');
                }
            }
        }
    },

    maparetroalimentada: function ()
    {
        var result = jsCustom.Funcion.getJSONURL(jsResumenMes.variable.urlPosicionRetroalimentada);

        if (result != null)
        {
            if (result.ok)
            {
                if (result.result != null)
                {
                    if (result.result.isError == "N")
                        this.posicion(result.result.custom01, "divMapaRetroalimentada");
                }
            }
        }
    },

    posicion: function (lstBE, tipo)
    {
        var features = [];
        var iconBase = 'http://maps.google.com/mapfiles/ms/icons/';
        var icons = {
            "C001": { icon: iconBase + 'ylw-pushpin.png' },
            "C002": { icon: iconBase + 'blue-pushpin.png' },
            "C003": { icon: iconBase + 'grn-pushpin.png' },
            "C004": { icon: iconBase + 'ltblu-pushpin.png' },
            "C005": { icon: iconBase + 'pink-pushpin.png' },
            "C006": { icon: iconBase + 'purple-pushpin.png' },
            "C007": { icon: iconBase + 'red-pushpin.png' },
            "C008": { icon: iconBase + 'purple-dot.png' }
        };        
        
        if (lstBE.length > 0)
        {
            for (var i = 0; i < lstBE.length; i++)
            {
                var obj = {};
                obj.latitud = parseFloat(String(lstBE[i][4].Value).replace(",", "."));
                obj.longitud = parseFloat(String(lstBE[i][5].Value).replace(",", "."));
                obj.type = "" + lstBE[i][0].Value + "";

                if (tipo == "divMapaPendiente")
                    obj.title = "campaña: " + lstBE[i][1].Value + "\ncliente: " + lstBE[i][2].Value + "\nasesor: " + lstBE[i][3].Value + "\nfecha: " + jsCustom.Funcion.setFormatDateJSON(lstBE[i][6].Value, null);

                if (tipo == "divMapaRetroalimentada")
                    obj.title = "campaña: " + lstBE[i][1].Value + "\ncliente: " + lstBE[i][2].Value + "\nasesor: " + lstBE[i][3].Value + "\nfecha: " + jsCustom.Funcion.setFormatDateJSON(lstBE[i][6].Value, null) + "\netiqueta: " + lstBE[i][7].Value;

                features.push(obj);
            }

            var map = new google.maps.Map(document.getElementById(tipo), {
                center: new google.maps.LatLng(features[0].latitud, features[0].longitud),
                zoom: 15
            });
            
            for (var i = 0; i < features.length; i++)
                var marker = new google.maps.Marker({ position: new google.maps.LatLng(features[i].latitud, features[i].longitud), icon: icons[features[i].type].icon, title: features[i].title, map: map });
        }
        else
        {
            var map = new google.maps.Map(document.getElementById(tipo), {
                center: new google.maps.LatLng(parseFloat(jsResumenMes.variable.defaultLatitud), parseFloat(jsResumenMes.variable.defaultLongitud)),
                zoom: 15
            });
        }
    },
    
}
