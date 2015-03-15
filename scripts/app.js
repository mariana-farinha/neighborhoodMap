function Marker(lat, lon, name) {
	var self = this;
	self.lat = lat;
	self.lon = lon;
	self.name = ko.observable(name);

	var myLatlng = new google.maps.LatLng(lat,lon);
	self.marker = new google.maps.Marker({
    position: myLatlng,
    title: self.name()
});

	self.marker.setMap(map);

}



function AppViewModel() {
	var self = this;
	self.markers = ko.observableArray([
		new Marker(38.714063, -9.138957, "Rossio"),
		new Marker(38.714072, -9.133497, "Castelo")
		]);

	self.saved_value = ko.observable("");

	self.match = function(str1, str2,i){
		if(str1.substring(0, str2.length)==str2){
			self.markers()[i].marker.setMap(map);
			return true;
		}else {
			self.markers()[i].marker.setMap(null);
			return false;
		}
	};



}

// Activates knockout.js
ko.applyBindings(new AppViewModel());