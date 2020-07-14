if (typeof (jsActividadDiaria) == "undefined")
{
    jsActividadDiaria = {};
}

jsActividadDiaria.variable =
{
    posLatitudRetroalimentacion: 0,
    posLongitudRetroalimentacion: 0,
    posLatitudActividad: 0,
    posLongitudActividad: 0,
    posLatitud: -12.109511,
    posLongitud: -76.974281,
    visita: "",
    tipoactividad: "",
    markersArray: [],
    urlArchivos: "",
    PuntoActividad: "",
    PuntoRetroalimentacion: "",
};

jsActividadDiaria.Funcion =
{
    onLoad: function ()
    {
        jsCustom.Default.setPanel();

        if (jsActividadDiaria.variable.visita == jsActividadDiaria.variable.tipoactividad)
        {
            $("#panelMapa").show();
            this.posicion();
        }

        this.obtenerArchivos();

        $('.image-popup-vertical-fit').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            mainClass: 'mfp-img-mobile',
            image: { verticalFit: true }
        });
    },

    posicion: function ()
    {
        var obj = {};
        obj.actividad = 0;
        obj.retroalimentacion = 0;
        obj.position = new google.maps.LatLng(jsActividadDiaria.variable.posLatitud, jsActividadDiaria.variable.posLongitud);

        if (jsActividadDiaria.variable.posLatitudActividad != 0 || jsActividadDiaria.variable.posLongitudActividad != 0) {
            obj.positionactividad = new google.maps.LatLng(jsActividadDiaria.variable.posLatitudActividad, jsActividadDiaria.variable.posLongitudActividad);
            obj.position = new google.maps.LatLng(jsActividadDiaria.variable.posLatitudActividad, jsActividadDiaria.variable.posLongitudActividad);
            obj.actividad = 1;
        }

        if (jsActividadDiaria.variable.posLatitudRetroalimentacion != 0 || jsActividadDiaria.variable.posLongitudRetroalimentacion != 0) {
            obj.positionretroalimentacion = new google.maps.LatLng(jsActividadDiaria.variable.posLatitudRetroalimentacion, jsActividadDiaria.variable.posLongitudRetroalimentacion);
            obj.position = new google.maps.LatLng(jsActividadDiaria.variable.posLatitudRetroalimentacion, jsActividadDiaria.variable.posLongitudRetroalimentacion);
            obj.retroalimentacion = 1;
        }
        
        var map = new google.maps.Map(document.getElementById('map'), {
            center: obj.position,
            zoom: 15
        });

        if (obj.actividad == 1)
            jsActividadDiaria.Funcion.addMarker(obj.positionactividad, "green", map, jsActividadDiaria.variable.PuntoActividad);

        if (obj.retroalimentacion == 1)
            jsActividadDiaria.Funcion.addMarker(obj.positionretroalimentacion, "red", map, jsActividadDiaria.variable.PuntoRetroalimentacion);
    },

    addMarker: function (latLng, color, map, title)
    {
        var url = "http://maps.google.com/mapfiles/ms/icons/";
        url += color + "-dot.png";

        var marker = new google.maps.Marker({ map: map, position: latLng, icon: { url: url }, title: title });

        jsActividadDiaria.variable.markersArray.push(marker);
    },

    obtenerArchivos: function ()
    {
        var actividadid = $("#formActividadDiariaShow_id").val();
        var result = jsCustom.Funcion.getJSON(jsActividadDiaria.variable.urlArchivos, { id: actividadid });

        if (result != null)
        {
            if (result.ok)
            {
                if (result.result.isError == "N")
                    $("#divActividadArchivo").html(result.result.custom01);
            }
        }
    },

}
