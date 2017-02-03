window.onload=function(){

    var map = L.map('map').setView([51, -0.09], 1.5);

    /*map.addEventListener('mousemove',function(event){
      var coord = document.getElementById("coord");
      coord.innerHTML='Latitude : '+decimale(event.latlng.lat)+' Longitude : '+decimale(event.latlng.lng);
    });*/

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    /*navigator.geolocation.getCurrentPosition(function (position) {

      var lat=position.coords.latitude;
      var long=position.coords.longitude;
      //deplacer la carte à lat long
      map.setView([lat, long], 13);
      L.marker([lat, long]).addTo(map)
      .bindPopup('Your current position.')
      .openPopup();

  });*/

  var iss = {
    url: "http://api.open-notify.org/iss-now.json",
    methode: "GET",
    getInfos: function(jsonObj){
      lat=jsonObj.iss_position.latitude;
      long=jsonObj.iss_position.longitude;
      return {lat:lat , long:long };
  }
};

var myIcon = L.icon({
  iconUrl: 'icone_astronaute.gif',
  iconSize: [29, 24],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
});

  ajaxIss();

      // destination et type de la requête AJAX (asynchrone ou non)
    /*var GM = {
      url: "http://maps.googleapis.com/maps/api/geocode/json?address=",
      methode: "POST",
      getInfos: function(jsonObj){
        coordArray=jsonObj.results[0].geometry.location;
        lat=coordArray.lat;
        long=coordArray.lng;
        cityName=jsonObj.results[0].formatted_address;
        return {lat:lat , long:long , cityName:cityName};
        }
      };

    var IGN={
      url: "http://api-adresse.data.gouv.fr/search/?q=",
      methode: "GET",
      getInfos: function(jsonObj){
        var coordArray=jsonObj.features[0].geometry.coordinates;
        var cityName=jsonObj.features[0].properties.city;
        var long=coordArray[0];
        var lat=coordArray[1];
        return {lat:lat , long:long , cityName:cityName};
        }
      };


    var searchGM = document.getElementById("placeGM");
    searchGM.addEventListener('submit',function(event){
      event.preventDefault();
      var recherche=searchGM.elements["placeGM"].value;
      ajaxGeoloc(GM,recherche);
    });
    var searchIGN = document.getElementById("placeIGN");
    searchIGN.addEventListener('submit',function(event){
      event.preventDefault();
      var recherche=searchIGN.elements["placeIGN"].value;
      ajaxGeoloc(IGN,recherche);
    });*/


    function ajaxIss(){
      var ajax = new XMLHttpRequest();
      ajax.open(iss.methode, iss.url, true);
      // métadonnées de la requête AJAX
      ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      ajax.addEventListener('readystatechange',function(){
        // si l'état est le numéro 4 et que la ressource est trouvée
          if(ajax.readyState == 4 && ajax.status == 200) {
              // le texte de la réponse
              var str=ajax.responseText;
              var jsonObj = JSON.parse(str);
              var result = iss.getInfos(jsonObj);
              // Test : If marker already exists, we delete it and create a new one
              L.marker([result.lat, result.long], {icon:myIcon}).addTo(map)
              .bindPopup("ISS")
              .openPopup();
              document.getElementById("lat").innerHTML = "Latitude : "+result.lat;
              document.getElementById("long").innerHTML = "Longitude : "+result.long;
              setTimeout(function() {ajaxIss ()},5000);
              L.marker([result.lat, result.long], {icon:myIcon}).removeTo(map);

          }
      });
      ajax.send("");


    };

    /*function decimale(coordfl, nb=3){
      n=coordfl.toFixed(nb);
      return n;
    };*/
}
