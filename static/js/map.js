// Create layer group
var markerClusterLayer = L.layerGroup();

d3.json("/test").then(function(response) {

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

// Lightmap layer
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
});

// Create a baseMaps object
var baseMaps = {
  "Light Map": lightmap,
  "Street Map": streetmap,
  "Dark Map": darkmap
};

// Create an overlay object
var overlayMaps = {
  "Markers": markerClusterLayer
};

// Define a map object
var myMap = L.map("map", {
  center: [38.067383325760818, 8.08252432997061],
  zoom: 1.5,
  layers: [lightmap, markerClusterLayer]
});

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);


// HIGHLIGHTED COUNTRIES

// geoJSON file
var link = '../static/js/countries.geo.json'

// Creating a function that will highlight the colours of the continent for which country it belongs to
function chooseColor(country){
  switch(country){
    case "Argentina":
      return "#6A81A0";
    case "Australia":
      return "#6A81A0";
    case "Austria":
      return "#6A81A0";
    case "Brazil":
      return "#6A81A0";
    case "Canada":
      return "#6A81A0";
    case "South America":
      return "#6A81A0";
    case "Chile":
      return "#6A81A0";
    case "China":
      return "#6A81A0";
    case "Colombia":
      return "#6A81A0";
    case "Czechia":
      return "#6A81A0";
    case "Denmark":
      return "#6A81A0";
    case "Egypt":
      return "#6A81A0";
    case "Swaziland":
      return "#6A81A0";
    case "France":
      return "#6A81A0";
    case "Germany":
      return "#6A81A0";
    case "Greece":
      return "#6A81A0";
    case "Iceland":
      return "#6A81A0";
    case "India":
      return "#6A81A0";
    case "Indonesia":
      return "#6A81A0";
    case "Ireland":
      return "#6A81A0";
    case "Israel":
      return "#6A81A0";
    case "Italy":
      return "#6A81A0";
    case "Japan":
      return "#6A81A0";
    case "Kazakhstan":
      return "#6A81A0";
    case "Lebanon":
      return "#6A81A0";
    case "Malaysia":
      return "#6A81A0";
    case "Mexico":
      return "#6A81A0";
    case "Morocco":
      return "#6A81A0";
    case "Netherlands":
      return "#6A81A0";
    case "Nigeria":
      return "#6A81A0";
    case "Norway":
      return "#6A81A0";
    case "Peru":
      return "#6A81A0";
    case "Philippines":
      return "#6A81A0";
    case "Poland":
      return "#6A81A0";
    case "Romania":
      return "#6A81A0";
    case "Russia":
      return "#6A81A0";
    case "Singapore":
      return "#6A81A0";
    case "South Africa":
      return "#6A81A0";
    case "South Korea":
      return "#6A81A0";
    case "Spain":
      return "#6A81A0";
    case "Sweden":
      return "#6A81A0";
    case "Switzerland":
      return "#6A81A0";
    case "Taiwan":
      return "#6A81A0";
    case "Thailand":
      return "#6A81A0";
    case "Turkey":
      return "#6A81A0";
    case "Ukraine":
      return "#6A81A0";
    case "United Arab Emirates":
      return "#6A81A0";
    case "United Kingdom":
      return "#6A81A0";
    case "United States of America":
      return "#6A81A0";
    case "Venezuela":
      return "#6A81A0";
    case "Vietnam":
      return "#6A81A0";
    case "Zimbabwe":
      return "#6A81A0";
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
        },
      });
    }
  }).addTo(myMap);
});