// Create layer group
var markerClusterLayer = L.layerGroup();

// Retrive data and then:
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

  // Add marker cluster layer to the map
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

// Darkmap Layer
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

// Pass map layers into layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);


// HIGHLIGHTED COUNTRIES

// Retrive geoJSON file
var link = '../static/js/countries.geo.json'

var countries = ["Algeria", "Argentina", "Australia", "Austria", "Belgium", "Brazil", "Canada", "Chile", "China", "Colombia", "Cyprus", "Czech Republic", "Denmark", "Egypt", "Eswatini", "Finland", "France", "Georgia", "Germany", "Greece", "Guernsey", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Ireland", "Israel", "Italy", "Japan", "Kazakhstan", "Lebanon", "Liechtenstein", "Macao", "Malaysia", "Mexico", "Monaco", "Morocco", "Nepal", "Netherlands", "New Zealand", "Nigeria", "Norway", "Oman", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Singapore", "Slovakia", "South Africa", "South Korea", "Spain", "St. Kitts and Nevis", "Sweden", "Switzerland", "Taiwan", "Tanzania", "Thailand", "Turkey", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Venezuela", "Vietnam", "Zimbabwe"]

// Create a function that will highlight the colours of the continent for which country it belongs to
function chooseColor(country){
  if (countries.includes(country)) {
    return "#6A81A0";
  } else {
    return "grey";
  }
}

// Retrive GeoJSON data and then:
d3.json(link).then(function(data) {

  // Create a geoJSON layer with the retrieved data
  L.geoJson(data, {

    // Style each feature 
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