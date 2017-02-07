window.onload=function(){

    var map = L.map('map').setView([51, -0.09], 1.5);


    L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
    attribution: 'Tiles &copy; Esri',
    }).addTo(map);

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
	  iconUrl: 'navette.png',
	  iconSize: [29, 24],
	  iconAnchor: [9, 21],
	  popupAnchor: [0, -14]
	});
	
	var marqueurs=L.layerGroup()
		.addTo(map);
		
		
	ajaxIss();

	

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
              //If marker already exists, we delete it and create a new one (idea)
              marqueurs.clearLayers();
              L.marker([result.lat, result.long], {icon:myIcon})
              .addTo(marqueurs)
              .bindPopup("ISS")
              .openPopup();
              
              document.getElementById("lat").innerHTML = "Latitude : "+result.lat;
              document.getElementById("long").innerHTML = "Longitude : "+result.long;
              setTimeout(function() {ajaxIss ()},5000);

			}
		});
      ajax.send("");


    };

}
