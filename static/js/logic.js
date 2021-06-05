// Creating map object
var myMap = L.map("map", {
  center: [32.75, -114.76],
  zoom: 1
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Creating a CSV Variable
var forbes_billionares = "../forbes_cleandata.csv"

// Grab the data with d3
d3.csv(forbes_billionares).then(function(response) {

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
    var location = response[i];

    // Check for location property
    if (location) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([location.latitude, location.longitude])
        .bindPopup("<h1>" + response[i].name + "</h1> <hr> <h3>Net Worth: $" + response[i].networth + "B</h3> <h3>Source: " + response[i].source + " </h3> <h3>Rank: " + response[i].rank + "</h3>"));
    }

  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});
