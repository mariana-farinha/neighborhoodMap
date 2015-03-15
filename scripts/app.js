function Marker(lat, lon, name) {
	var self = this;
	self.lat = lat;
	self.lon = lon;
	self.name = ko.observable(name);
}



function AppViewModel() {
	var self = this;
	self.markers = ko.observableArray([
		new Marker(38.714063, -9.138957, "Rossio"),
		new Marker(38.714072, -9.133497, "Castelo")
		]);

	self.saved_value = ko.observable("");

	self.match = function(str1, str2){
		if(str1.substring(0, str2.length)==str2){
			return true;
		}else {
			return false;
		}
	};



}

// Activates knockout.js
ko.applyBindings(new AppViewModel());