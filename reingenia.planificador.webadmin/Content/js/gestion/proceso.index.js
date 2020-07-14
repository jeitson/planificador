if (typeof (jsProceso) == "undefined")
{
    jsProceso = {};
}

jsProceso =
{
    init: function ()
    {

        $(document).on("click", "#btnCliente", function (e)
        {
            e.preventDefault();

            jsProceso.Funcion.procesar(jsProceso.variable.urlClienteProceso, "cliente");
        });

        $(document).on("click", "#btnProspecto", function (e)
        {
            e.preventDefault();

            jsProceso.Funcion.procesar(jsProceso.variable.urlProspectoProceso, "prospecto");
        });

        $(document).on("click", "#btnAgenda", function (e)
        {
            e.preventDefault();

            jsProceso.Funcion.procesar(jsProceso.variable.urlAgendaProceso, "agenda");
        });

        $(document).on("click", "#btnAgendaDiaria", function (e)
        {
            e.preventDefault();

            jsProceso.Funcion.procesar(jsProceso.variable.urlAgendaDiariaProceso, "agendadiaria");
        });

        $(document).on("click", "#btnRetroalimentacion", function (e)
        {
            e.preventDefault();

            jsProceso.Funcion.procesar(jsProceso.variable.urlRetroalimentacionProceso, "retroalimentacion");
        });

    },
};

jsProceso.variable =
{
    urlClienteResumen: "",
    urlProspectoResumen: "",
    urlAgendaResumen: "",
    urlAgendaDiariaResumen: "",
    urlRetroalimentacionResumen: "",
    urlClienteProceso: "",
    urlProspectoProceso: "",
    urlAgendaProceso: "",
    urlAgendaDiariaProceso: "",
    urlRetroalimentacionProceso: "",
    messageEmpty: "",
};

jsProceso.Funcion =
{
    onLoad: function ()
    {
        jsCustom.Default.setPanel();
        jsProceso.init();

        this.agenda();
        this.agendadiaria();
        this.retroalimentacion();
        this.prospecto();
        this.cliente();
    },

    agenda: function ()
    {
        this.listar(jsProceso.variable.urlAgendaResumen, "tableAgenda", "6", "agenda");
    },

    agendadiaria: function ()
    {
        this.listar(jsProceso.variable.urlAgendaDiariaResumen, "tableAgendaDiaria", "5", "agendadiaria");
    },

    retroalimentacion: function ()
    {
        this.listar(jsProceso.variable.urlRetroalimentacionResumen, "tableRetroalimentacion", "5", "retroalimentacion");
    },

    prospecto: function ()
    {
        this.listar(jsProceso.variable.urlProspectoResumen, "tableProspecto", "5", "prospecto");
    },

    cliente: function ()
    {
        this.listar(jsProceso.variable.urlClienteResumen, "tableCliente", "5", "cliente");
    },

    listar: function (url, table, columns, tipo)
    {
        $("#" + table + " tbody tr").each(function () { this.parentNode.removeChild(this); });

        var trinfoempty = "<tr><td colspan='" + columns + "' class='dtCenter'>" + jsProceso.variable.messageEmpty + "</td></tr>";
        var result = jsCustom.Funcion.getJSONURL(url);

        if (result != null)
        {
            if (result.ok)
            {
                if (result.result != null)
                {
                    if (result.result.isError == "N")
                    {
                        if (result.result.custom01 != null && result.result.custom01.length > 0)
                        {
                            var trinfo = "";
                            var lstBE = result.result.custom01;

                            for (var i = 0; i < lstBE.length; i++)
                            {
                                if (tipo == "cliente")
                                    trinfo += "<tr><td class='dtLeft'>" + lstBE[i][1].Value + "</td><td class='dtCenter'>" + lstBE[i][2].Value + "</td><td class='dtCenter'>" + lstBE[i][3].Value + "</td><td class='dtCenter'>" + lstBE[i][4].Value + "</td><td class='dtCenter'>" + lstBE[i][5].Value + "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;" + lstBE[i][6].Value + "</td><td class='dtCenter'>" + lstBE[i][7].Value + "</td></tr>";

                                if (tipo == "prospecto")
                                    trinfo += "<tr><td class='dtLeft'>" + lstBE[i][1].Value + "</td><td class='dtCenter'>" + lstBE[i][2].Value + "</td><td class='dtCenter'>" + lstBE[i][3].Value + "</td><td class='dtCenter'>" + lstBE[i][4].Value + "</td><td class='dtCenter'>" + lstBE[i][5].Value + "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;" + lstBE[i][6].Value + "</td><td class='dtCenter'>" + lstBE[i][7].Value + "</td></tr>";

                                if (tipo == "agenda")
                                    trinfo += "<tr><td class='dtLeft'>" + lstBE[i][1].Value + "</td><td class='dtCenter'>" + lstBE[i][2].Value + "</td><td class='dtCenter'>" + lstBE[i][3].Value + "</td><td class='dtCenter'>" + lstBE[i][4].Value + "</td><td class='dtCenter'>" + lstBE[i][5].Value + " | " + lstBE[i][6].Value + "</td><td class='dtCenter'>" + lstBE[i][7].Value + "</td></tr>";

                                if (tipo == "agendadiaria")
                                    trinfo += "<tr><td class='dtCenter'>" + lstBE[i][1].Value + "</td><td class='dtCenter'>" + lstBE[i][2].Value + "</td><td class='dtCenter'>" + lstBE[i][3].Value + "</td><td class='dtCenter'>" + lstBE[i][4].Value + "</td><td class='dtCenter'>" + lstBE[i][5].Value + "</td></tr>";

                                if (tipo == "retroalimentacion")
                                    trinfo += "<tr><td class='dtCenter'>" + lstBE[i][1].Value + "</td><td class='dtCenter'>" + lstBE[i][2].Value + "</td><td class='dtCenter'>" + lstBE[i][3].Value + "</td><td class='dtCenter'>" + lstBE[i][4].Value + "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;" + lstBE[i][5].Value + "</td><td class='dtCenter'>" + lstBE[i][6].Value + "</td></tr>";
                            }

                            $("#" + table + " tbody").append(trinfo);

                            return;
                        }
                    }
                }
            }
        }

        $("#" + table + " tbody").append(trinfoempty);
    },

    procesar: function (url, tipo)
    {
        var error = jsCustom.Funcion.getJSONProcess(url, null);

        if (error == "")
        {
            if (tipo == "cliente")
                this.cliente();

            if (tipo == "prospecto")
                this.prospecto();

            if (tipo == "agenda")
                this.prospecto();

            if (tipo == "agendadiaria")
                this.agendadiaria();

            if (tipo == "retroalimentacion")
                this.retroalimentacion();
        }
        else
            jsCustom.Funcion.showMessage(error);
    }

};
