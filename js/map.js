var nzLoc = {lat: -40.9006, lng: 174.8860 };
var map;
var directionsDisplay, directionsService;
var countryRestrict = {'country': 'nz'};
//start and end location variables
var startLocationVar = document.getElementById('startLocation');
var endLocationVar = document.getElementById('endLocation');



function initMap() {
	//initializing map settings and html render location
	map = new google.maps.Map(document.getElementById('mapCanvas'), {
		zoom: 6,
		center: nzLoc,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true
	});

	//autocomplete boxes for start and end points
	var startAutocomplete = new google.maps.places.Autocomplete((
		startLocationVar), {
		types: ['(cities)'],
		componentRestrictions: countryRestrict
	});

	var endAutocomplete = new google.maps.places.Autocomplete((
		endLocationVar), {
		types: ['(cities)'],
		componentRestrictions: countryRestrict
	});

	//initializing directions service
	directionsService = new google.maps.DirectionsService;
	directionsDisplay = new google.maps.DirectionsRenderer;
	directionsDisplay.setMap(map);

}