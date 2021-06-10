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
// Darkmap layer

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
  center: [7.067383325760818, 7.08252432997061],
  zoom: 2.5,
  layers: [lightmap, markerClusterLayer]
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
      return "aliceblue";
    case "Australia":
      return "aquamarine";
    case "Austria":
      return "darkgrey";
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
    case "Czechia":
      return "azure";
    case "Denmark":
      return "beige";
    case "Egypt":
      return "bisque";
    case "Swaziland":
      return "blanchedalmond";
    case "France":
      return "blueviolet";
    case "Germany":
      return "brown";
    case "Greece":
      return "burlywood";
    case "Iceland":
      return "cadetblue";
    case "India":
      return "chocolate";
    case "Indonesia":
      return "coral";
    case "Ireland":
      return "chartreuse";
    case "Israel":
      return "cornflowerblue";
    case "Italy":
      return "cornsilk";
    case "Japan":
      return "crimson";
    case "Kazakhstan":
      return "darkblue";
    case "Lebanon":
      return "darkcyan";
    case "Malaysia":
      return "darkgoldenrod";
    case "Mexico":
      return "darkgreen";
    case "Morocco":
      return "darkkhaki";
    case "Netherlands":
      return "darkolivegreen";
    case "Nigeria":
      return "darkmagenta";
    case "Norway":
      return "darkorange";
    case "Peru":
      return "darkorchid";
    case "Philippines":
      return "darkred";
    case "Poland":
      return "darksalmon";
    case "Romania":
      return "darkseagreen";
    case "Russia":
      return "darkslateblue";
    case "Singapore":
      return "darkturquoise";
    case "South Africa":
      return "forestgreen";
    case "South Korea":
      return "ghostwhite";
    case "Spain":
      return "firebrick";
    case "Sweden":
      return "fuchsia";
    case "Switzerland":
      return "gold";
    case "Taiwan":
      return "goldenrod";
    case "Thailand":
      return "greenyellow";
    case "Turkey":
      return "indianred";
    case "Ukraine":
      return "ivory";
    case "United Arab Emirates":
      return "indigo";
    case "United Kingdom":
      return "lavender";
    case "United States of America":
      return "lightskyblue";
    case "Venezuela":
      return "lemonchiffon";
    case "Vietnam":
      return "linen";
    case "Zimbabwe":
      return "olivedrab";
    default:
      return "black";
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
            fillOpacity: 0.8
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.4
          });
        },
        // When a feature (country) is clicked, it is enlarged to fit the screen
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
        },
      });
    }
  }).addTo(myMap);
});
