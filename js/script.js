$(document).ready(function(){
	var totalDistance;
	var totalDuration;
	function locationSubmit() {
		if (("" === startLocationVar.value) || ("" === endLocationVar.value)) {
			locationValidation('Empty input(s)');
			return;
		} else if (startLocationVar.value === endLocationVar.value) {
			locationValidation('Same location');
			return;
		} else {
			totalDistance = 0;
			totalDuration = 0;
			$("#distanceOutput").html('&#160');
			$("#durationOutput").html('&#160');
			calculateDirections(directionsService, directionsDisplay);
		}
	}

	$("#locationSubmit").click(function() {
		locationSubmit();
	})

	$(".locationInput").keypress(function (e) {
		if (e.which == 13) {
			locationSubmit();
			return false;
		}
	})

	//calculation directions from start to end point
	function calculateDirections(directionsService, directionsDisplay) {
		var request = {
			origin: startLocationVar.value,
			destination: endLocationVar.value,
			travelMode: 'DRIVING'
		}
		directionsService.route(request, function(response, status) {
			if (status === 'OK') {
				directionsDisplay.setDirections(response);
				showDistance(response);
				$(".slideout-menu").css("height", "66%");
			} else {
				locationValidation(status)
			}	
		});
	}

	//distance calculator
	function showDistance (directionResult) {
		var myRoute = directionResult.routes[0]
		for (var i = 0; i < myRoute.legs.length; i++) {
			totalDistance = totalDistance + myRoute.legs[i].distance.value;
			totalDuration = totalDuration + myRoute.legs[i].duration.value;
		}
		$("#distanceOutput").html(Math.round(totalDistance / 1000) + "km");
		var durationHours = ~~(totalDuration / 3600);
		var durationMinutes = 60*((totalDuration / 3600) - durationHours);
		$("#durationOutput").html(durationHours + "h " + Math.round(durationMinutes) + "m drive");
	}

	//function for outputting to validation textbox
	function locationValidation(status) {
		$("#validationOutput").html('Error: ' + status);
			setTimeout(fade_out, 3000);
			function fade_out() {
				$("#validationOutput").html('&#160');
			}
	}

	//click listener for slideout plugin
   $(".slideoutbtn").click(function() {
   	slideout.toggle();
   });
   slideout.disableTouch();

   //translate map against slideout's padding
   var fixMapCanvas = document.querySelector('#mapCanvas');
   var fixSlideoutbtn = document.querySelector('.slideoutbtn');

	slideout.on('beforeopen', function () {
		fixMapCanvas.style.transition = 'transform 0ms ease';
		fixMapCanvas.style.transform = 'translateX(-1px)';
		fixSlideoutbtn.style.transition = 'transform 400ms ease';
		fixSlideoutbtn.style.transform = 'translateX(250px)';
	});

	slideout.on('beforeclose', function () {
	  	fixMapCanvas.style.transition = 'transform 0ms ease';
	  	fixMapCanvas.style.transform = 'translateX(0px)';
	  
	});

	slideout.on('close', function () {
		fixSlideoutbtn.style.transition = 'transform 400ms ease';
	 	fixSlideoutbtn.style.transform = 'translateX(0px)';
	});

	//sets the constraints of the input fields on radio button select
	//also updates interface with relevant feedback
	$("input:radio[name=vehicle]").click(function() {
		var inputValue = $(this).attr('value');
		var peopleInputField = $(".peopleInput")[0];
		var daysInputField = $(".daysInput")[0];
		peopleInputField.disabled = false;
		daysInputField.disabled = false;
		if (inputValue == "motorcycle") {
			peopleInputField.min = 1;
			peopleInputField.max = 1;
			daysInputField.min = 1;
			daysInputField.max = 5;
			$(".costInfoOutput").html("$109/day<br>3.7L/100km");
		} else if (inputValue == "car") {
			peopleInputField.min = 1;
			peopleInputField.max = 2;
			daysInputField.min = 1;
			daysInputField.max = 10;
			$(".costInfoOutput").html("$129/day<br>8.5L/100km");
		} else if (inputValue == "van") {
			peopleInputField.min = 1;
			peopleInputField.max = 5;
			daysInputField.min = 3;
			daysInputField.max = 10;
			$(".costInfoOutput").html("$144/day<br>9.7L/100km");
		} else if (inputValue == "motorHome") {
			peopleInputField.min = 2;
			peopleInputField.max = 6;
			daysInputField.min = 2;
			daysInputField.max = 15;
			$(".costInfoOutput").html("$200/day<br>17L/100km");
		}
		peopleInputField.value = peopleInputField.min;
		daysInputField.value = daysInputField.min;
		$(".peopleOutput").html(peopleInputField.min + " - " + peopleInputField.max + " people");
		$(".daysOutput").html(daysInputField.min + " - " + daysInputField.max + " days");
 	});

	//calculates the fuel and hire costs
	var vehicleValue;
	var travelCost;
 	$("#calculatorSubmit").click(function() {
 		vehicleValue = $("input:radio[name=vehicle]:checked").val();
 		var peopleValue = $(".peopleInput").val();
 		var daysValue = $(".daysInput").val();
 		var vehicle = window['vehicleValue'];
 		if (vehicleValue != "") {
	 		travelCostDays = daysValue * window[vehicleValue + statsDaily];
	 		travelCostFuel = ~~(window[vehicleValue + statsFuel] * (totalDistance / 1000));
	 		travelCost = travelCostFuel + travelCostDays
		} else { return false;}
		$(".costOutput").html("Fuel: $"+travelCostFuel+"<br>Hire: $"+travelCostDays+"<br>Total: $"+travelCost);
		
 	})
 	
})
//just some normal ol variables don't mind me
var statsFuel = 'StatslitresPerKm';
var statsDaily = 'StatsdailyCost';
var petrolCost = 1.859;
var motorcycleStatsdailyCost = 109;
var motorcycleStatslitresPerKm = 0.037;
var carStatsdailyCost = 129;
var carStatslitresPerKm = 0.085;
var vanStatsdailyCost = 144;
var vanStatslitresPerKm = 0.097;
var motorHomeStatsdailyCost = 200;
var motorHomeStatslitresPerKm = 0.17;
