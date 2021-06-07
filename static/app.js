// Import our CSV data with d3's .csv import method.
d3.json("/forbes").then(function(data) {
  // Visualize the data
  console.log(data);
  // visualize(data);

});
