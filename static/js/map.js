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
      return "lightskyblue";
    case "Australia":
      return "lightskyblue";
    case "Austria":
      return "lightskyblue";
    case "Brazil":
      return "lightskyblue";
    case "Canada":
      return "lightskyblue";
    case "South America":
      return "lightskyblue";
    case "Chile":
      return "lightskyblue";
    case "China":
      return "lightskyblue";
    case "Colombia":
      return "lightskyblue";
    case "Czechia":
      return "lightskyblue";
    case "Denmark":
      return "lightskyblue";
    case "Egypt":
      return "lightskyblue";
    case "Swaziland":
      return "lightskyblue";
    case "France":
      return "lightskyblue";
    case "Germany":
      return "lightskyblue";
    case "Greece":
      return "lightskyblue";
    case "Iceland":
      return "lightskyblue";
    case "India":
      return "lightskyblue";
    case "Indonesia":
      return "lightskyblue";
    case "Ireland":
      return "lightskyblue";
    case "Israel":
      return "lightskyblue";
    case "Italy":
      return "lightskyblue";
    case "Japan":
      return "lightskyblue";
    case "Kazakhstan":
      return "lightskyblue";
    case "Lebanon":
      return "lightskyblue";
    case "Malaysia":
      return "darkgoldenrod";
    case "Mexico":
      return "lightskyblue";
    case "Morocco":
      return "lightskyblue";
    case "Netherlands":
      return "lightskyblue";
    case "Nigeria":
      return "lightskyblue";
    case "Norway":
      return "lightskyblue";
    case "Peru":
      return "lightskyblue";
    case "Philippines":
      return "lightskyblue";
    case "Poland":
      return "lightskyblue";
    case "Romania":
      return "lightskyblue";
    case "Russia":
      return "lightskyblue";
    case "Singapore":
      return "lightskyblue";
    case "South Africa":
      return "lightskyblue";
    case "South Korea":
      return "lightskyblue";
    case "Spain":
      return "lightskyblue";
    case "Sweden":
      return "lightskyblue";
    case "Switzerland":
      return "lightskyblue";
    case "Taiwan":
      return "lightskyblue";
    case "Thailand":
      return "lightskyblue";
    case "Turkey":
      return "lightskyblue";
    case "Ukraine":
      return "lightskyblue";
    case "United Arab Emirates":
      return "lightskyblue";
    case "United Kingdom":
      return "lightskyblue";
    case "United States of America":
      return "lightskyblue";
    case "Venezuela":
      return "lightskyblue";
    case "Vietnam":
      return "lightskyblue";
    case "Zimbabwe":
      return "lightskyblue";
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