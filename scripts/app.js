function Marker(lat, lon, name) {
	var self = this;
	self.lat = lat;
	self.lon = lon;
	self.name = ko.observable(name);
	self.infowindow = new google.maps.InfoWindow({
					content: ""
				});

	var myLatlng = new google.maps.LatLng(lat,lon);

	self.marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: self.name()
});

}



function AppViewModel() {
	var self = this;

	self.saved_value = ko.observable("");

	self.markers = ko.observableArray([
		new Marker(38.714063, -9.138957, "Rossio Square"),
		new Marker(38.714072, -9.133497, "São Jorge Castle")
		]);

	self.match = function(str1, str2,i){
		if(str1.substring(0, str2.length)==str2){
			self.markers()[i].marker.setMap(map);
			return true;
		}else {
			self.markers()[i].marker.setMap(null);
			return false;
		}
	};

	var titles = encodeURI(self.markers()[0].name());


	for(var i=1; i < self.markers().length; i++) {
		titles = titles + "|" + encodeURI(self.markers()[i].name());

	}


	var wikiURL = "http://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles="+ titles+"&exlimit=max";

	$.ajax({
		url: wikiURL,
		dataType: "jsonp",
		success: function(response) {
			console.log(response);
			var i = 0;
			for(var obj in response.query.pages) {

				self.markers()[i].marker.infowindow = new google.maps.InfoWindow({
					content: response.query.pages[obj].extract
				});

				google.maps.event.addListener(self.markers()[i].marker, 'click', (function(icopy) {

					return function() {

						for(var j = 0; j < self.markers().length; j++){
							self.markers()[j].marker.infowindow.close();

						};

					self.markers()[icopy].marker.infowindow.open(map, self.markers()[icopy].marker);
				};
			})(i));

				i++;
			}
			

		}
	})



}

// Activates knockout.js
ko.applyBindings(new AppViewModel());