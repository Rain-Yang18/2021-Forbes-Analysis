
//     // Function to determine marker size based on population
//     function markerSize(population) {
//         return population / 40;
//     }

//     var locations = [];

//     var forbes_billionares = "../forbes_cleandata.csv"

//     d3.csv(forbes_billionares).then(function(response) {
//         for (var i = 0; i < response.length; i++) {
//         var location = response[i]
//         locations.push([location.latitude, location.longitude])
//         }
//     });
    

//   console.log(locations);
  
//   // Define arrays to hold created city and state markers
//   var cityMarkers = [];
//   var stateMarkers = [];
  
//   // Loop through locations and create city and state markers
//   for (var i = 0; i < locations.length; i++) {
//     // Setting the marker radius for the state by passing population into the markerSize function
//     stateMarkers.push(
//       L.circle(locations[i].coordinates, {
//         stroke: false,
//         fillOpacity: 0.75,
//         color: "white",
//         fillColor: "white",
//         radius: markerSize(locations[i].state.population)
//       })
//     );
  
//     // Setting the marker radius for the city by passing population into the markerSize function
//     cityMarkers.push(
//       L.circle(locations[i].coordinates, {
//         stroke: false,
//         fillOpacity: 0.75,
//         color: "purple",
//         fillColor: "purple",
//         radius: markerSize(locations[i].city.population)
//       })
//     );
//   }
  
  // Create base layers
  
//   // Streetmap Layer
//   var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_KEY
//   });
  
//   var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "dark-v10",
//     accessToken: API_KEY
//   });
  
//   // Create two separate layer groups: one for cities and one for states
//   var states = L.layerGroup(stateMarkers);
//   var cities = L.layerGroup(cityMarkers);
  
  // Create a baseMaps object
//   var baseMaps = {
//     "Street Map": streetmap,
//     "Dark Map": darkmap
//   };
  
//   // Create an overlay object
//   var overlayMaps = {
//     "State Population": states,
//     "City Population": cities
//   };
  
  // Define a map object
//   var myMap = L.map("map", {
//     center: [32.75, -114.76],
//     zoom: 1,
//     // layers: [streetmap, states, cities]
//   });
  
//   // Pass our map layers into our layer control
//   // Add the layer control to the map
//   L.control.layers(baseMaps, {
//     collapsed: false
//   }).addTo(myMap);


    // Create map variable
    var myMap = L.map("map", {
        center: [32.2524, 7.9980],
        zoom: 2
    });

    // Create map layer
    var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        tileSize: 512,
        zoomOffset: -1,
        id: "light-v10",
        accessToken: API_KEY
    }).addTo(myMap);
 