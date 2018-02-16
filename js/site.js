window.addEventListener('load', function() {
	var apiUrl = "http://www.se.rit.edu/~swen-344/activities/rest/RESTAPI-Weather.php"
	get_api_zipcode_list(function(zipCodeList){
		var linkContainer = document.getElementById('zipcode-container');
		zipCodeList.forEach(function(zipcode) {
			var link = document.createElement('a');
			link.id = 'zipcode_' + zipcode;
			link.innerHTML = zipcode;
			link.addEventListener('click', zipCodeClickHandler);

			linkContainer.appendChild(link);
		});
	});


	function get_api_zipcode_list(callback) {
		var url = apiUrl + '?action=get_weather_list';
		$.get(url, function(data) {
			data = JSON.parse(data);
			var zipcodes = data.reduce(function(array, obj){
				array.push(obj.zip);
				return array;
			}, []);
			
			callback(zipcodes);
		});
	}
	
	function get_api_data_by_zipcode(zipcode, callback) {
		var url = apiUrl + '?action=get_weather&zip=' + zipcode;
		$.get(url, function(data) {
			data = JSON.parse(data);
			callback(data);
		});
	}
	
	/**************************
	 * Interaction Handlers
	 **************************/
	
	function zipCodeClickHandler(event) {
		var target = event.target;
		var zipcode = target.id.replace('zipcode_', '');
		get_api_data_by_zipcode(zipcode, function(data) {
			document.getElementById("name").innerHTML = data.name;
			document.getElementById("forecast").innerHTML = data.forecast;
			document.getElementById("image").src = data.image;
		});
		
		
	};
});