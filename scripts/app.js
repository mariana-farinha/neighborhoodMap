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
		new Marker(38.712088, -9.127635, "Fado"),
		new Marker(38.752954, -9.184753, "Stadium of Light"),
		new Marker(38.725917, -9.150767, "Sebastião José de Carvalho e Melo, 1st Marquis of Pombal"),
		new Marker(38.787844, -9.390641, "Pena National Palace"),
		new Marker(38.761489, -9.161807, "Estádio José Alvalade"),
		new Marker(38.714072, -9.133497, "São Jorge Castle"),
		new Marker(38.717080, -9.135792, "Martim Moniz"),
		new Marker(38.715906, -9.124717, "Church of Santa Engrácia"),
		new Marker(38.714063, -9.138957, "Rossio Square"),
		new Marker(38.708847, -9.136921, "Rua Augusta Arch")
		]);

	self.match = function(str1, str2,i){
		if(str2){
		str2 = str2.trim();
		str1 = str1.trim();
		for(var k = 0; k < str1.length; k++) {
			if(str1.substring(k, k + str2.length) === str2){
				self.markers()[i].marker.setMap(map);
				return true;
			};
		};
		self.markers()[i].marker.setMap(null);
		return false;
	} else {
		for(var k = 0; k < self.markers().length; k++ ){
			self.markers()[i].marker.setMap(map);
			return true;
		};
	};
};
	

	var titles = encodeURI(self.markers()[0].name());


	for(var i=1; i < self.markers().length; i++) {
		titles = titles + "|" + encodeURI(self.markers()[i].name());

	}


	var wikiURL = "http://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles="+ titles+"&exlimit=max";
    
    var wikiRequestTimeout = setTimeout(function() {
    	$("#error").addClass("col-md-12 alert alert-danger").text("Failed to get info windows");

    }, 8000)

	$.ajax({
		url: wikiURL,
		dataType: "jsonp",
		success: function(response) {
			clearTimeout(wikiRequestTimeout);

			$("#error").addClass("alert alert-success").text("Success!");

			var i = 0;
			for(var obj in response.query.pages) {

				self.markers()[i].marker.infowindow = new google.maps.InfoWindow({
					content: response.query.pages[obj].extract
				});

				google.maps.event.addListener(self.markers()[i].marker, 'click', (function(icopy) {

					return function() {

						for(var j = 0; j < self.markers().length; j++){
							self.markers()[j].marker.infowindow.close();
							self.markers()[j].marker.setAnimation(null);

						};

					self.markers()[icopy].marker.infowindow.open(map, self.markers()[icopy].marker);
					self.markers()[icopy].marker.setAnimation(google.maps.Animation.BOUNCE);
				};
			})(i));

				i++;
			}
			

		}
	})


}

// Activates knockout.js
ko.applyBindings(new AppViewModel());