var map, latLng, marker, infoWindow, ad, geocoder = new google.maps.Geocoder();

function showAddress(val)
{
    if (val === "")
    {
        alert(jsProspecto.Variables.mapaMessageQuery);
        
        return;
    }
    
    infoWindow.close();
    
    geocoder.geocode({ 'address': decodeURI(val) }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK)
        {
            marker.setPosition(results[0].geometry.location);
            geocode(results[0].geometry.location);
        }
        else
            defaultLocation();
    });
}

function showInfoWindow(address)
{
    var html = '';
    var pos = marker.getPosition();
    
    html += '<b>' + jsProspecto.Variables.mapaTitulo + ':</b> ' + address;
    html += '<br><small>' + '<i class="ti ti-location-pin"></i> Latitud: ' + pos.lat().toString().substr(0, 10) + ' &nbsp; Longitud: ' + pos.lng().toString().substr(0, 10) + '</small><br>';                

    var lat = pos.lat().toString().substr(0, 10);
    var lng = pos.lng().toString().substr(0, 10);

    if (jsProspecto.Variables.mapa == "direccion")
    {
        $("#formProspectoDireccion_direccion").val(address);
        $("#formProspectoDireccion_latitud").val(lat);
        $("#formProspectoDireccion_longitud").val(lng);
    }
    else if (jsProspecto.Variables.mapa == "archivo")
    {
        $("#formProspectoArchivo_latitud").val(lat);
        $("#formProspectoArchivo_longitud").val(lng);
    }

    map.panTo(pos);
    infoWindow.setContent("<div id='iw' style='max-width:250px; color: #000;'>" + html + "</div>");
    infoWindow.open(map, marker);
}

function geocode(position)
{
    geocoder.geocode({ latLng: position }, function(responses) {
        var pos = marker.getPosition();
        
        if (responses && responses.length > 0)
            showInfoWindow(responses[0].formatted_address);
        else
            window.alert(jsProspecto.Variables.mapaMessageGoogleError);
    });
}

function ctrlq()
{
    var myOptions = {
        zoom: 14,
        fullscreenControl: false,
        scrollwheel: false,
        panControl: true,
        zoomControl: true,
        zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_BOTTOM },
        scaleControl: false,
        scaleControlOptions: { position: google.maps.ControlPosition.RIGHT_BOTTOM },
        streetViewControl: true,
        streetViewControlOptions: { position: google.maps.ControlPosition.RIGHT_BOTTOM },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: { position: google.maps.ControlPosition.RIGHT_BOTTOM }
    };

    map = new google.maps.Map(document.getElementById('googlemaps'), myOptions);

    var coordinates = window.location.hash;

    if (coordinates !== "" && coordinates !== "#maps")
    {
        defaultLocation();
        showAddress(coordinates.substr(1));
    }
    else if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(locationFound, defaultLocation);
    else
        defaultLocation();
    
    var input = document.getElementById('pac-input');

    $("#pac-input").val('');
    
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    autocomplete.setTypes(["geocode"]);

    autocomplete.addListener('place_changed', function() {
        infoWindow.close();
        marker.setVisible(false);

        var place = autocomplete.getPlace();

        if (!(place.geometry))
        {
            window.alert(jsProspecto.Variables.mapaMessageAutoCompleteError);

            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport)
            map.fitBounds(place.geometry.viewport);
        else
        {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';

        if (place.address_components)
        {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');

            showInfoWindow(address);
        }
    });
}

function locationFound(position)
{
    showMap(position.coords.latitude, position.coords.longitude);
}

function defaultLocation()
{
    var lat = "";
    var lng = "";

    if (jsProspecto.Variables.mapa == "direccion")
    {
        lat = jsCustom.Funcion.getValidateDefault($("#formProspectoDireccion_latitud").val(), "");
        lng = jsCustom.Funcion.getValidateDefault($("#formProspectoDireccion_longitud").val(), "");
    }
    else if (jsProspecto.Variables.mapa == "archivo")
    {
        lat = jsCustom.Funcion.getValidateDefault($("#formProspectoArchivo_latitud").val(), "");
        lng = jsCustom.Funcion.getValidateDefault($("#formProspectoArchivo_longitud").val(), "");
    }

    if (lat != "" && lng != "")
    {
        showMap(parseFloat(lat), parseFloat(lng));

        return;
    }

    showMap(parseFloat(jsProspecto.Variables.defaultLatitud), parseFloat(jsProspecto.Variables.defaultLongitud));
}

function showMap(lat, lng, hideinfo)
{
    latLng = new google.maps.LatLng(lat, lng);

    map.setCenter(latLng);

    map.panBy(0, 120);

    marker = new google.maps.Marker({
        position: latLng,
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP
    });

    marker.addListener('click', toggleBounce);

    infoWindow = new google.maps.InfoWindow({
        content: '<div id="iw" style="max-width:300px;font-size:1.1em;color:#333">' + jsProspecto.Variables.mapaInformacion + '</div>'
    });

    if (hideinfo)
        geocode(latLng);
    else
        infoWindow.open(map, marker);

    google.maps.event.addListener(marker, 'dragstart', function(e) {
        infoWindow.close();
    });

    google.maps.event.addListener(marker, 'dragend', function(e) {
        var point = marker.getPosition();

        map.panTo(point);

        geocode(point);
    });
}

function toggleBounce()
{
    if (marker.getAnimation() !== null)
        marker.setAnimation(null);
    else
        marker.setAnimation(google.maps.Animation.BOUNCE);
}
