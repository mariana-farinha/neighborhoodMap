function Marker(lat, lon, name) {
	var self = this;
	self.lat = lat;
	self.lon = lon;
	self.name = ko.observable(name);
	self.display = 0;

}


function AppViewModel() {
	var self = this;
	self.markers = ko.observableArray([
		new Marker(38.714063, -9.138957, "Rossio"),
		new Marker(38.714072, -9.133497, "Castelo")
		]);




}

// Activates knockout.js
ko.applyBindings(new AppViewModel());