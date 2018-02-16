window.addEventListener('load', function() {
	var zipCodeList = get_zipcode_list();

	var linkContainer = document.getElementById('zipcode-container');
	zipCodeList.forEach(function(zipcode) {
		var link = document.createElement('a');
		link.id = 'zipcode_' + zipcode;
		link.innerHTML = zipcode;
		link.addEventListener('click', zipCodeClickHandler);

		linkContainer.appendChild(link);
	});


	function zipCodeClickHandler(event) {
		var target = event.target;
		var zipcode = target.id.replace('zipcode_', '');
		var data = get_forecast_by_zipcode(zipcode);
		
		document.getElementById("Temperature").innerHTML = data.temperature;
		document.getElementById("Humidity").innerHTML = data.humidity;
		document.getElementById("Weather").innerHTML = data.weather;
	};
});