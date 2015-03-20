##Neighborhood Map Project

###Getting started:

To run the project open index.html as usual.

The project contains a CSS folder that has the bootstrap files. For this project only bootstrap.min.css was used, which is the minified version of bootstrap.css.

The scripts folder contains app.js, holding the ViewModel , and a lib folder with the jQuery and Knockout libraries used.

###Outline

Use the search box to look for a location. The list view, as well as the map markers, automatically updates with the locations that match your query.

Clicking a marker will display the initial text of a Wikipedia article relating to that location. The click will also set off a bounce animation of that same marker.

Clicking another marker will close the previously opened info window and animation. It will open the info window and set the animation on the new marker.

When the content of the info window is properly loaded, a success message will appear on the top of the page. Otherwise, an error message will ensue.

####Remarks

The Google Maps API and the Wikipedia API with the TextExtracts extension were used.

