// Creating a CSV variable
var forbes_billionares = "../../forbes_cleandata.csv"

// Create layer group
var markerClusterLayer = L.layerGroup();

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
  markerClusterLayer.addLayer(markers);
});

// Create base layers
// Streetmap Layer

var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/dark-v10",
  accessToken: API_KEY
});

// Create two separate layer groups: one for cities and one for states
// var markerCluster = L.layerGroup(markerCluster);

// Create a baseMaps object
var baseMaps = {
  "Street Map": streetmap,
  "Dark Map": darkmap
};

// Create an overlay object
var overlayMaps = {
  "Markers": markerClusterLayer
};

// Define a map object
var myMap = L.map("map", {
  center: [7.067383325760818, 7.08252432997061],
  zoom: 2.5,
  layers: [streetmap, markerClusterLayer]
});

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);


// HIGHLIGHTED COUNTRIES

// geoJSON file
var link = 'static/countries.geo.json'

// Creating a function that will highlight the colours of the continent for which country it belongs to
function chooseColor(country){
  switch(country){
    case "Argentina":
      return "yellow";
    case "Australia":
      return "orange";
    case "Austria":
      return "black";
    case "Brazil":
      return "green";
    case "Canada":
      return "blue";
    case "South America":
      return "purple";
    case "Chile":
      return "cyan";
    case "China":
      return "red";
    case "Colombia":
      return "pink";
    default:
      return "grey";
  }
}

// Grabbing our GeoJSON data..
d3.json(link).then(function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function(Feature) {
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our country (color based on country)
        fillColor: chooseColor(Feature.properties.name),
        fillOpacity: 0.5,
        weight: 0.7
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
          // myMap.addLayer(markerClusterLayer);
        },
        // onwheel: function(event) {
        //   myMap.removeLayer(markerClusterLayer);
      });
    }
  }).addTo(myMap);
});
