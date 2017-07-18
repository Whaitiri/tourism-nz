var nzLoc = {lat: -40.9006, lng: 174.8860 };
var map;
var directionsDisplay, directionsService;
var countryRestrict = {'country': 'nz'};

function initMap() {
	//initializing map settings and html render location
	map = new google.maps.Map(document.getElementById('mapCanvas'), {
		zoom: 6,
		center: nzLoc
	});
	
	//initializing directions service
	directionsService = new google.maps.DirectionsService;
	directionsDisplay = new google.maps.DirectionsRenderer;
	directionsDisplay.setMap(map);

	var onChangeHandler = function() {
		calculateDirections(directionsService, directionsDisplay)
	};

	document.getElementById('startLocation').addEventListener('change', onChangeHandler);
	document.getElementById('endLocation').addEventListener('change', onChangeHandler);

	//autocomplete boxes for start and end points
	var startAutocomplete = new google.maps.places.Autocomplete((
		document.getElementById('startLocation')), {
		types: ['(cities)'],
		componentRestrictions: countryRestrict
	});

	var endAutocomplete = new google.maps.places.Autocomplete((
		document.getElementById('endLocation')), {
		types: ['(cities)'],
		componentRestrictions: countryRestrict
	});
}

//calculation directions from start to end point
function calculateDirections(directionsService, directionsDisplay) {
	var request = {
		origin: document.getElementById('startLocation').value,
		destination: document.getElementById('endLocation').value,
		travelMode: 'DRIVING'
	}
	if (document.getElementById('startLocation').value === document.getElementById('endLocation').value) {
		window.alert('Please dont use the same location twice');
		return;
	}
	directionsService.route(request, function(response, status) {
		if (status === 'OK') {
			directionsDisplay.setDirections(response);
		} else {
			// window.alert('Directions request failed due to ' + status);
		}
	});
}