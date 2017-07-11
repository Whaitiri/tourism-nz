var nzLoc = {lat: -40.9006, lng: 174.8860 };
var mapMain;

function initMap() {
	mapMain = new google.maps.Map(document.getElementById('mapContainer'), {
		zoom: 6,
		center: nzLoc
	});
	var marker = new google.maps.Marker({
		position: nzLoc,
		map: mapMain
	});
}

initMap();