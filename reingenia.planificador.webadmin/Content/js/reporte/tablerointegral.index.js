if (typeof (jsTableroIntegral) == "undefined")
{
    jsTableroIntegral = {};
}

jsTableroIntegral =
{
    init: function ()
    {
        
        $(document).on("click", "#btnGraph, #btnData", function (e)
        {
            e.preventDefault();

            var tipo = $(this).attr("id");

            if (tipo == "btnGraph")
                jsTableroIntegral.variable.tipoinformacion = "grafico";
                
            if (tipo == "btnData")
                jsTableroIntegral.variable.tipoinformacion = "dato";

            jsTableroIntegral.Funcion.mostrarinformacion();
        });
        
        $(document).on("click", ".btnDetalle", function (e)
        {
            e.preventDefault();

            var id = jsCustom.Funcion.getValidate($(this).closest('tr'), "id", null, "data", "string");
            var nombre = jsCustom.Funcion.getValidate($(this).closest('tr'), "nombre", null, "data", "string");

            if (jsTableroIntegral.variable.nivel == "000" && id == "001")
                jsTableroIntegral.Funcion.pendientefuerzacomercial();
            else if (jsTableroIntegral.variable.nivel == "000" && id == "002")
                jsTableroIntegral.Funcion.gestionadafuerzacomercial();
            else if (jsTableroIntegral.variable.nivel == "000" && id == "003")
                jsTableroIntegral.Funcion.diariafuerzacomercial();
            else if (jsTableroIntegral.variable.nivel == "001")
                jsTableroIntegral.Funcion.pendienteporfuerzacomercial(id, nombre);
            else if (jsTableroIntegral.variable.nivel == "001001")
                jsTableroIntegral.Funcion.pendienteporasesor(id, nombre);
            else if (jsTableroIntegral.variable.nivel == "002")
                jsTableroIntegral.Funcion.gestionadaporfuerzacomercial(id, nombre);
            else if (jsTableroIntegral.variable.nivel == "002001")
                jsTableroIntegral.Funcion.gestionadaporasesor(id, nombre);
            else if (jsTableroIntegral.variable.nivel == "003")
                jsTableroIntegral.Funcion.diariaporfuerzacomercial(id, nombre);
            else if (jsTableroIntegral.variable.nivel == "003001")
                jsTableroIntegral.Funcion.diariaporasesor(id, nombre);
        });

        $(document).on("click", "#btnRegresar", function (e)
        {
            e.preventDefault();

            if (jsTableroIntegral.variable.nivel == "001" || jsTableroIntegral.variable.nivel == "002" || jsTableroIntegral.variable.nivel == "003")
                jsTableroIntegral.Funcion.tablerointegral();
            else if (jsTableroIntegral.variable.nivel == "001001")
                jsTableroIntegral.Funcion.pendientefuerzacomercial();
            else if (jsTableroIntegral.variable.nivel == "001002")
                jsTableroIntegral.Funcion.pendienteporfuerzacomercial(jsTableroIntegral.variable.var1, jsTableroIntegral.variable.var2);
            else if (jsTableroIntegral.variable.nivel == "002001")
                jsTableroIntegral.Funcion.gestionadafuerzacomercial();
            else if (jsTableroIntegral.variable.nivel == "002002")
                jsTableroIntegral.Funcion.gestionadaporfuerzacomercial(jsTableroIntegral.variable.var1, jsTableroIntegral.variable.var2);
            else if (jsTableroIntegral.variable.nivel == "003001")
                jsTableroIntegral.Funcion.diariafuerzacomercial();
            else if (jsTableroIntegral.variable.nivel == "003002")
                jsTableroIntegral.Funcion.diariaporfuerzacomercial(jsTableroIntegral.variable.var1, jsTableroIntegral.variable.var2);
        });
        
    },
};

jsTableroIntegral.variable =
{
    urlTableroIntegral: "",
    urlPendienteFuerzaComercial: "",
    urlPendientePorFuerzaComercial: "",
    urlPendientePorAsesor: "",
    urlGestionadaFuerzaComercial: "",
    urlGestionadaPorFuerzaComercial: "",
    urlGestionadaPorAsesor: "",
    urlDiariaFuerzaComercial: "",
    urlDiariaPorFuerzaComercial: "",
    urlDiariaPorAsesor: "",
    tipoinformacion: "dato",
    nivel: "000",
    title: "",
    subtitle: "",
    infoDetalle: "",
    infoEmpty: "",
    infoLlamada: "",
    infoVisita: "",
    infoTarea: "",
    infoTotal: "",
    infoFuerzaComercial: "",
    infoAsesor: "",
    infoColor: ["#F7464A", "#FFD700", "#B8860B", "#808000", "#7FFF00", "#8FBC8F", "#2F4F4F", "#5F9EA0", "#87CEFA", "#FFE4C4", "#BC8F8F", "#A9A9A9", "#F0FFFF"],
    var1: "",
    var2: "",/*
    var3: "",
    var4: "",
    var5: "",
    var6: "",*/
};

jsTableroIntegral.Funcion =
{
    onLoad: function ()
    {
        jsCustom.Default.setPanel();
        jsTableroIntegral.init();
        
        this.tablerointegral();
    },
    
    tablerointegral: function ()
    {
        jsTableroIntegral.variable.tipoinformacion = "grafico";
        jsTableroIntegral.variable.nivel = "000";

        var result = jsCustom.Funcion.getJSONURL(jsTableroIntegral.variable.urlTableroIntegral);

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
                        var trinfo = "";

                        for (var i = 0; i < lstBE.length; i++)
                        {
                            data.push(lstBE[i][2].Value);
                            label.push(lstBE[i][1].Value + " [" + lstBE[i][2].Value + "]");

                            trinfo += "<tr data-id='" + lstBE[i][0].Value + "'><td>" + lstBE[i][1].Value + "</td><td class='dtCenter'>" + lstBE[i][2].Value + "</td><td class='dtCenter'><a class='btn btn-xs btn-blue btnDetalle' role='button' title='" + jsTableroIntegral.variable.infoDetalle + "'><i class='fa fa-newspaper-o'></i></a></td></tr>";
                        }

                        $("#tableData1 tbody tr").each(function () { this.parentNode.removeChild(this); });
                        $("#tableData1 tbody").append(trinfo);

                        var chartcontext = document.getElementById("chartTableroIntegral").getContext("2d");
                        var chartgraph = new Chart(chartcontext, {
                            type: 'horizontalBar',
                            data: { labels: label, datasets: [{ label: result.result.message, data: data, backgroundColor: ["#008B8B", "#A52A2A", "#EEE8AA"] }] },
                            options: {
                                scales: {
                                    yAxes: [{ barThickness: 50, ticks: { beginAtZero: true, mirror: true, } }],
                                },
                                responsive: true,
                            }
                        });

                        jsTableroIntegral.variable.title = result.result.message;
                    }
                }
            }
        }

        this.mostrarinformacion();
    },
    
    pendientefuerzacomercial: function ()
    {
        jsTableroIntegral.variable.nivel = "001";
        jsTableroIntegral.variable.title = "";
        jsTableroIntegral.variable.subtitle = "";

        this.setDataFuerzaComercial(jsTableroIntegral.variable.urlPendienteFuerzaComercial, "#divPendienteFuerzaComercial", "chartPendienteFuerzaComercial");
    },

    pendienteporfuerzacomercial: function (fuerzacomercial, fuerzacomercialnombre)
    {
        jsTableroIntegral.variable.nivel = "001001";
        jsTableroIntegral.variable.title = "";
        jsTableroIntegral.variable.subtitle = jsTableroIntegral.variable.infoFuerzaComercial + ": " + fuerzacomercialnombre;
        jsTableroIntegral.variable.var1 = fuerzacomercial;
        jsTableroIntegral.variable.var2 = fuerzacomercialnombre;

        this.setDataPorFuerzaComercial(jsTableroIntegral.variable.urlPendientePorFuerzaComercial, "#divPendientePorFuerzaComercial", "chartPendientePorFuerzaComercial");
    },

    pendienteporasesor: function (asesorid, asesornombre)
    {
        jsTableroIntegral.variable.nivel = "001002";
        jsTableroIntegral.variable.title = "";
        jsTableroIntegral.variable.subtitle = jsTableroIntegral.variable.infoAsesor + ": " + asesornombre;

        this.setDataPorAsesor(jsTableroIntegral.variable.urlPendientePorAsesor, asesorid, "#divPendientePorAsesor", "chartPendientePorAsesor");
    },

    gestionadafuerzacomercial: function ()
    {
        jsTableroIntegral.variable.nivel = "002";
        jsTableroIntegral.variable.title = "";
        jsTableroIntegral.variable.subtitle = "";

        this.setDataFuerzaComercial(jsTableroIntegral.variable.urlGestionadaFuerzaComercial, "#divGestionadaFuerzaComercial", "chartGestionadaFuerzaComercial");        
    },

    gestionadaporfuerzacomercial: function (fuerzacomercial, fuerzacomercialnombre)
    {
        jsTableroIntegral.variable.nivel = "002001";
        jsTableroIntegral.variable.title = "";
        jsTableroIntegral.variable.subtitle = jsTableroIntegral.variable.infoFuerzaComercial + ": " + fuerzacomercialnombre;
        jsTableroIntegral.variable.var1 = fuerzacomercial;
        jsTableroIntegral.variable.var2 = fuerzacomercialnombre;

        this.setDataPorFuerzaComercial(jsTableroIntegral.variable.urlGestionadaPorFuerzaComercial, "#divGestionadaPorFuerzaComercial", "chartGestionadaPorFuerzaComercial");
    },

    gestionadaporasesor: function (asesorid, asesornombre)
    {
        jsTableroIntegral.variable.nivel = "002002";
        jsTableroIntegral.variable.title = "";
        jsTableroIntegral.variable.subtitle = "asesor: " + asesornombre;

        this.setDataPorAsesor(jsTableroIntegral.variable.urlGestionadaPorAsesor, asesorid, "#divGestionadaDiariaPorAsesor", "chartGestionadaDiariaPorAsesor");
    },

    diariafuerzacomercial: function ()
    {
        jsTableroIntegral.variable.nivel = "003";
        jsTableroIntegral.variable.title = "";
        jsTableroIntegral.variable.subtitle = "";

        this.setDataFuerzaComercial(jsTableroIntegral.variable.urlDiariaFuerzaComercial, "#divDiariaFuerzaComercial", "chartDiariaFuerzaComercial");
    },

    diariaporfuerzacomercial: function (fuerzacomercial, fuerzacomercialnombre)
    {
        jsTableroIntegral.variable.nivel = "003001";
        jsTableroIntegral.variable.title = "";
        jsTableroIntegral.variable.subtitle = jsTableroIntegral.variable.infoFuerzaComercial + ": " + fuerzacomercialnombre;
        jsTableroIntegral.variable.var1 = fuerzacomercial;
        jsTableroIntegral.variable.var2 = fuerzacomercialnombre;

        this.setDataPorFuerzaComercial(jsTableroIntegral.variable.urlDiariaPorFuerzaComercial, "#divDiariaPorFuerzaComercial", "chartDiariaPorFuerzaComercial");
    },

    diariaporasesor: function (asesorid, asesornombre)
    {
        jsTableroIntegral.variable.nivel = "003002";
        jsTableroIntegral.variable.title = "";
        jsTableroIntegral.variable.subtitle = jsTableroIntegral.variable.infoAsesor + ": " + asesornombre;

        this.setDataPorAsesor(jsTableroIntegral.variable.urlDiariaPorAsesor, asesorid, "#divGestionadaDiariaPorAsesor", "chartGestionadaDiariaPorAsesor");
    },
    
    mostrarinformacion: function ()
    {
        $("#divGraph").hide();
        $("#divTable").hide();
        $("#divRegresar").hide();
        $("#spanTitle").html(jsTableroIntegral.variable.title);
        $("#spanSubTitle").html(jsTableroIntegral.variable.subtitle);

        if (jsTableroIntegral.variable.nivel != "000")
            $("#divRegresar").show();

        if (jsTableroIntegral.variable.tipoinformacion == "grafico")
        {
            $("#divTableroIntegral").hide();
            $("#divPendienteFuerzaComercial").hide();
            $("#divPendientePorFuerzaComercial").hide();
            $("#divPendientePorAsesor").hide();
            $("#divGestionadaFuerzaComercial").hide();
            $("#divGestionadaPorFuerzaComercial").hide();
            $("#divGestionadaPorAsesor").hide();
            $("#divGestionadaDiariaFuerzaComercial").hide();
            $("#divGestionadaDiariaPorFuerzaComercial").hide();
            $("#divGestionadaDiariaPorAsesor").hide();

            if (jsTableroIntegral.variable.nivel == "000")
                $("#divTableroIntegral").show();

            if (jsTableroIntegral.variable.nivel == "001")
                $("#divPendienteFuerzaComercial").show();

            if (jsTableroIntegral.variable.nivel == "001001")
                $("#divPendientePorFuerzaComercial").show();

            if (jsTableroIntegral.variable.nivel == "001002")
                $("#divPendientePorAsesor").show();

            if (jsTableroIntegral.variable.nivel == "002")
                $("#divGestionadaFuerzaComercial").show();

            if (jsTableroIntegral.variable.nivel == "002001")
                $("#divGestionadaPorFuerzaComercial").show();

            if (jsTableroIntegral.variable.nivel == "002002")
                $("#divGestionadaPorAsesor").show();

            if (jsTableroIntegral.variable.nivel == "003")
                $("#divGestionadaDiariaFuerzaComercial").show();

            if (jsTableroIntegral.variable.nivel == "003001")
                $("#divGestionadaDiariaPorFuerzaComercial").show();

            if (jsTableroIntegral.variable.nivel == "003002")
                $("#divGestionadaDiariaPorAsesor").show();

            $("#divGraph").show();
        }
        else if (jsTableroIntegral.variable.tipoinformacion == "dato")
        {
            $("#tableData1").hide();
            $("#tableData2").hide();

            if (jsTableroIntegral.variable.nivel == "000" || jsTableroIntegral.variable.nivel == "001" || jsTableroIntegral.variable.nivel == "002" || jsTableroIntegral.variable.nivel == "003")
                $("#tableData1").show();

            if (jsTableroIntegral.variable.nivel == "001001" || jsTableroIntegral.variable.nivel == "001002" || jsTableroIntegral.variable.nivel == "002001" || jsTableroIntegral.variable.nivel == "002002" || jsTableroIntegral.variable.nivel == "003001" || jsTableroIntegral.variable.nivel == "003002")
                $("#tableData2").show();

            $("#divTable").show();
        }
    },

    setDataFuerzaComercial: function (url, divData, chart)
    {
        var result = jsCustom.Funcion.getJSONURL(url);

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
                        var trinfo = "";

                        for (var i = 0; i < lstBE.length; i++)
                        {
                            data.push(lstBE[i][2].Value);
                            label.push(lstBE[i][1].Value);
                            color.push(jsTableroIntegral.variable.infoColor[i]);
                            //color.push(Math.floor(Math.random() * 16777215).toString(16));

                            trinfo += "<tr data-id='" + lstBE[i][0].Value + "' data-nombre='" + lstBE[i][1].Value + "'><td>" + lstBE[i][1].Value + "</td><td class='dtCenter'>" + lstBE[i][2].Value + "</td><td class='dtCenter'><a class='btn btn-xs btn-blue btnDetalle' role='button' title='" + jsTableroIntegral.variable.infoDetalle + "'><i class='fa fa-newspaper-o'></i></a></td></tr>";
                        }

                        $("#tableData1 tbody tr").each(function () { this.parentNode.removeChild(this); });

                        if (trinfo == "")
                            trinfo = "<tr><td colspan='3' class='dtCenter'>" + jsTableroIntegral.variable.infoEmpty + "</td></tr>";
                        
                        $("#tableData1 tbody").append(trinfo);

                        $(divData).show();
                        $("#divGraph").show();

                        var chartcontext = document.getElementById(chart).getContext('2d');
                        var chartgraph = new Chart(chartcontext, {
                            type: "pie",
                            data: { datasets: [{ data: data, backgroundColor: color, }], labels: label },
                            options: { responsive: true, }
                        });

                        jsTableroIntegral.variable.title = result.result.message;
                    }
                }
            }
        }

        this.mostrarinformacion();
    },

    setDataPorFuerzaComercial: function (url, divData, chart)
    {
        var result = jsCustom.Funcion.getJSON(url, { fuerzacomercial: jsTableroIntegral.variable.var1 });
        
        if (result != null)
        {
            if (result.ok)
            {
                if (result.result != null)
                {
                    if (result.result.isError == "N")
                    {
                        var lstBE = result.result.custom01;
                        var data1 = [];
                        var data2 = [];
                        var data3 = [];
                        var data4 = [];
                        var label = [];
                        var trinfo = "";

                        for (var i = 0; i < lstBE.length; i++)
                        {
                            label.push(lstBE[i][1].Value);
                            data1.push(lstBE[i][2].Value);
                            data2.push(lstBE[i][3].Value);
                            data3.push(lstBE[i][4].Value);
                            data4.push(lstBE[i][5].Value);

                            trinfo += "<tr data-id='" + lstBE[i][0].Value + "' data-nombre='" + lstBE[i][1].Value + "'><td>" + lstBE[i][1].Value + "</td><td class='dtCenter'>" + lstBE[i][2].Value + "</td><td class='dtCenter'>" + lstBE[i][3].Value + "</td><td class='dtCenter'>" + lstBE[i][4].Value + "</td><td class='dtCenter'>" + lstBE[i][5].Value + "</td><td class='dtCenter'><a class='btn btn-xs btn-blue btnDetalle' role='button' title='" + jsTableroIntegral.variable.infoDetalle + "'><i class='fa fa-newspaper-o'></i></a></td></tr>";
                        }

                        $("#tableData2 tbody tr").each(function () { this.parentNode.removeChild(this); });

                        if (trinfo == "")
                            trinfo = "<tr><td colspan='6' class='dtCenter'>" + jsTableroIntegral.variable.infoEmpty + "</td></tr>";

                        $("#tableData2 tbody").append(trinfo);

                        $(divData).show();
                        $("#divGraph").show();

                        var chartcontext = document.getElementById(chart).getContext('2d');
                        var chartgraph = new Chart(chartcontext, {
                            type: "horizontalBar",
                            data: {
                                datasets: [
                                    { label: jsTableroIntegral.variable.infoLlamada, stack: 'Stack 0', backgroundColor: "#1E90FF", borderWidth: 1, data: data1 },
                                    { label: jsTableroIntegral.variable.infoVisita, stack: 'Stack 0', backgroundColor: "#FFD700", borderWidth: 1, data: data2 },
                                    { label: jsTableroIntegral.variable.infoTarea, stack: 'Stack 0', backgroundColor: "#DCDCDC", borderWidth: 1, data: data3 },
                                    { label: jsTableroIntegral.variable.infoTotal, stack: 'Stack 0', backgroundColor: "#7FFF00", borderWidth: 1, data: data4 }],
                                labels: label
                            },
                            options: {
                                tooltips: {
                                    mode: 'index',
                                    intersect: false
                                },
                                responsive: true,
                                scales: {
                                    xAxes: [{
                                        stacked: true,
                                    }],
                                    yAxes: [{
                                        stacked: true
                                    }]
                                } }
                        });

                        jsTableroIntegral.variable.title = result.result.message;
                    }
                }
            }
        }

        this.mostrarinformacion();
    },

    setDataPorAsesor: function (url, asesorid, divData, chart)
    {
        var result = jsCustom.Funcion.getJSON(url, { asesorid: asesorid });
        
        if (result != null)
        {
            if (result.ok)
            {
                if (result.result != null)
                {
                    if (result.result.isError == "N")
                    {
                        var lstBE = result.result.custom01;
                        var data1 = [];
                        var data2 = [];
                        var data3 = [];
                        var label = [];
                        var trinfo = "";

                        for (var i = 0; i < lstBE.length; i++)
                        {
                            label.push(lstBE[i][1].Value);
                            data1.push(lstBE[i][2].Value);
                            data2.push(lstBE[i][3].Value);
                            data2.push(lstBE[i][4].Value);

                            trinfo += "<tr data-id='" + lstBE[i][0].Value + "'><td>" + lstBE[i][1].Value + "</td><td class='dtCenter'>" + lstBE[i][2].Value + "</td><td class='dtCenter'>" + lstBE[i][3].Value + "</td><td class='dtCenter'>" + lstBE[i][4].Value + "</td><td class='dtCenter'>" + lstBE[i][5].Value + "</td><td></td></tr>";
                        }

                        $("#tableData2 tbody tr").each(function () { this.parentNode.removeChild(this); });

                        if (trinfo == "")
                            trinfo = "<tr><td colspan='6' class='dtCenter'>" + jsTableroIntegral.variable.infoEmpty + "</td></tr>";

                        $("#tableData2 tbody").append(trinfo);
                        
                        $(divData).show();
                        $("#divGraph").show();

                        var chartcontext = document.getElementById(chart).getContext('2d');
                        var chartgraph = new Chart(chartcontext, {
                            type: "bar",
                            data: {
                                datasets: [
                                    { label: jsTableroIntegral.variable.infoLlamada, backgroundColor: "#1E90FF", borderWidth: 1, data: data1 },
                                    { label: jsTableroIntegral.variable.infoVisita, backgroundColor: "#FFD700", borderWidth: 1, data: data2 },
                                    { label: jsTableroIntegral.variable.infoTarea, backgroundColor: "#7FFF00", borderWidth: 1, data: data3 }],
                                labels: label
                            },
                            options: { responsive: true, }
                        });

                        jsTableroIntegral.variable.title = result.result.message;
                    }
                }
            }
        }

        this.mostrarinformacion();
    }
    
};
