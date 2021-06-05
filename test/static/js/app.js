// DEFINE FUNCTIONS //

// Define function which populates Demographic Info box
function buildInfoBox(id, data) {
    // Select metadata for the selected ID

    var filteredMetadata = data.filter(sample => sample.Name == id);

    // Get a reference to the demographic info element
    var demographicInfo = d3.select("#sample-metadata");

    // Clear content if exists
    demographicInfo.html("");

    console.log(filteredMetadata);

    keys = Object.keys(filteredMetadata[0]);
    values = Object.values(filteredMetadata[0])

    demographicInfo.append("p").attr("class", "bold").text(`${keys[0]}:`).append("tspan").attr("class", "normal").text(` ${values[0]}`);
    demographicInfo.append("p").attr("class", "bold").text(`${keys[4]}:`).append("tspan").attr("class", "normal").text(` ${values[4]}`);
    demographicInfo.append("p").attr("class", "bold").text(`Net Worth:`).append("tspan").attr("class", "normal").text(` ${values[1]} b$`);
    demographicInfo.append("p").attr("class", "bold").text(`Self Made:`).append("tspan").attr("class", "normal").text(` ${values[11]}`);
    demographicInfo.append("p").attr("class", "bold").text(`${keys[3]}:`).append("tspan").attr("class", "normal").text(` ${values[3]}`);
    demographicInfo.append("p").attr("class", "bold").text(`${keys[7]}:`).append("tspan").attr("class", "normal").text(` ${values[7]}`);
    demographicInfo.append("p").attr("class", "bold").text(`${keys[6]}:`).append("tspan").attr("class", "normal").text(` ${values[6]}`);
    demographicInfo.append("p").attr("class", "bold").text(`${keys[10]}:`).append("tspan").attr("class", "normal").text(` ${values[10]}`);
    demographicInfo.append("p").attr("class", "bold").text(`${keys[8]}:`).append("tspan").attr("class", "normal").text(` ${values[8]}`);
    demographicInfo.append("p").attr("class", "bold").text(`${keys[9]}:`).append("tspan").attr("class", "normal").text(` ${values[9]}`);

};

// {
//  0 "Name": "Jeff Bezos", 
//  1 "NetWorth": "177.0",
//  2 "Country": "United States",
//  3 "Source": "Amazon",
//  4 "Rank": "1",
//  5 "Age": "57.0",
//  6 "Residence": "Seattle, Washington",
//  7 "Citizenship": "United States",
//  8 "Status": "In Relationship",
//  9 "Children": "4.0",
//  10 "Education": "Bachelor of Arts/Science, Princeton University",
//  11 "Self_made": "True",
//  12 "geometry": "POINT (-122.3300624 47.6038321)"
// }


// // Define function which filters data for the Bar and Bubble Charts
// function filterChartData(id, data) {
//     // Select samples data for the selected ID
//     var filteredSamplesData = data.samples.filter(sample => sample.id === id);
  
//     // Initialize an empty array to store info for charts
//     var chartData = [];

//     // Add samples data to the array  
//     for (var j = 0; j < filteredSamplesData[0].sample_values.length; j++) {
//       chartData.push({
//         sample_values: filteredSamplesData[0].sample_values[j],
//         otu_ids: filteredSamplesData[0].otu_ids[j],
//         otu_labels: filteredSamplesData[0].otu_labels[j]
//       });
//     };

//     // Return completed array for plot functions
//     return chartData;
// };

// // Define function which creates Horizontal Bar Chart
// function buildBarChart(id, data) {
//     // Initialize an array with data for selected ID
//     var chartData = filterChartData(id, data);

//     // Sort the array by sample values in descending order
//     var sortedBarChartData= chartData.sort(function compareFunction(a, b) {
//       return b.sample_values - a.sample_values;
//     });

//     // Slice the first 10 objects for plotting
//     var slicedBarChartData = sortedBarChartData.slice(0, 10);

//     // Reverse the array to accommodate Plotly's defaults
//     var reversedBarChartData = slicedBarChartData.reverse();
    
//     // Define trace parameters
//     var trace = {
//         x: reversedBarChartData.map(object => object.sample_values),
//         y: reversedBarChartData.map(object => `OTU ${object.otu_ids}`),
//         text: reversedBarChartData.map(object => object.otu_labels),
//         type: "bar",
//         orientation: "h"
//     };

//     // Assign data for plot
//     var plotData = [trace];

//     // Define layout parameters
//     var layout = {
//         title: `<b>TOP 10 Operational Taxonomic Units</b> <br> found in Test Subject ID No ${id}`,
//     };

//     // Render the plot to the div tag with id "bar"
//     Plotly.newPlot("bar", plotData, layout);
// };

// // Define function which creates Bubble Chart
// function buildBubbleChart(id, data) {
//   // Initialize an array with data for selected ID
//   var chartData = filterChartData(id, data);
  
//   // Define variable for markers' size
//   var size = chartData.map(object => object.sample_values);
  
//   // Define trace parameters
//   var trace = {
//       x: chartData.map(object => object.otu_ids),
//       y: chartData.map(object => object.sample_values),
//       text: chartData.map(object => object.otu_labels),
//       mode: 'markers',
//       marker: {
//           size: size,
//           color: chartData.map(object => object.otu_ids),
//           colorscale: 'YlGnBu',
//           sizeref: 1.25,
//       }
//   };

//   // Assign data for plot
//   var plotData = [trace];
  
//   // Define layout parameters
//   var layout = {
//     title: `<b>Operational Taxonomic Units found in Test Subject ID No ${id}</b> <br> Bubble Chart`,
//     xaxis: { title: "OTU ID"}
//   };

//   // Render the plot to the div tag with id "bubble"
//   Plotly.newPlot('bubble', plotData, layout);
// };


// Define function which creates a list of items for dropdown menus
function dropdownMenus(dropdownMenus, dataset) {

  // For each dropdown menu element:
  Object.entries(dropdownMenus).forEach(([key, value]) => {

      // Remove any data from the dropdown list if already exist
      value.html("");

      // Create set of unique values from dataset for each filter
      var unique = new Set(dataset.map(x => x[key]));

      // Get unique set values
      var setValues= unique.values();

      // Create empty array to store unique values
      uniqueValues = [];

      // Save each unique value in an array
      for (var i = 0; i < unique.size; i++) {
          uniqueValues.push(setValues.next().value);
      };

      // Create a list item with 'All' option
      emptylistItem = value.append("li");
      emptylistItem.append("a").text("All");

      // Append unique values for each dropdown menu
      uniqueValues.forEach(uniqueval => {
          var listItem = value.append("li");
          listItem.append("a").text(uniqueval);
      });

  });

};

function buildStatusPieChart(country, data) {

  // Fitler data for the selected ID
  var filteredMetadata = data.filter(sample => sample.Country == country);

  console.log(filteredMetadata);

  // Create set of unique values from dataset for each filter
  var unique = new Set(data.map(x => x["Status"]));

  // Get unique set values
  var setValues= unique.values();

  // Create empty array to store unique values
  var uniqueValues = [];

  var uniqueValuestest = {};

  // Save each unique value in an array
  for (var i = 0; i < unique.size; i++) {
      // uniqueValues.push(setValues.next().value);
      uniqueValuestest[setValues.next().value] = 0;
  };

  console.log(uniqueValues);
  console.log(uniqueValuestest);

  data.forEach((event) => {

    Object.entries(uniqueValuestest).forEach(([key, value]) => {

          if (key === Object.values(event)[8]) {
            
            uniqueValuestest[key] += 1;

          };
    }); 

  }); 

  console.log(uniqueValuestest);

  delete Object.assign(uniqueValuestest, {["Unknown"]: uniqueValuestest[""]})[""];


  var colors = {
    "In Relationship": '#ddca7e',
    "Married": 'a33327',
    "Divorced": '#b55c52',
    "Widowed, Remarried": '#a3b7a9',
    "Unknown": '#b55c52',
    "Widowed": '#ad8174',
    "Single": '#ad8174',
    "Separated": '#a3b7a9',
    "Engaged": '#cdead6'
  };

  var currentColors = {};

  Object.keys(uniqueValuestest).forEach((test) => {

    Object.entries(colors).forEach(([key, value]) => {

        if (key === test) {
          
          currentColors[test] = value;

        };

    });
  });

  console.log(currentColors);

  // // Part 5 - Working Pie Chart
  var trace1 = {
    labels: Object.keys(uniqueValuestest),
    values: Object.values(uniqueValuestest),
    type: 'pie',
    // marker: {colors:['#a3b7a9', '#b55c52']}
    marker: {colors:Object.values(currentColors)}
  };

  var data = [trace1];

  var layout = {
    title: "<b>Status</b>",
    width: 600,
    height: 600
  };

  Plotly.newPlot("status", data, layout);

}; 


function buildPieChart(country, data) {

  // Fitler data for the selected ID
  var filteredMetadata = data.filter(sample => sample.Country == country);

  // console.log(filteredMetadata);

  var results = { 
    Yes: 0,
    No: 0
  };

    // Add keys and values from the metadata for selected ID into the Info Box
    filteredMetadata.forEach((event) => {

          if (Object.values(event)[11] == "True") {
            results.Yes += 1;
          } else {
            results.No += 1;
          };

    });

  console.log(results);

  // // Part 5 - Working Pie Chart
  var trace1 = {
    labels: Object.keys(results),
    values: Object.values(results),
    type: 'pie',
    // marker: {colors:['#a3b7a9', '#b55c52']}
    marker: {colors:['#689775', '#a33327']}
  };

  var data = [trace1];

  var layout = {
    title: "<b>Self made</b>",
    width: 500,
    height: 500
  };

  Plotly.newPlot("self_made", data, layout);


  // var data = [
  //   { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50], // Adjusted values for 9 categories 
  //   rotation: 90,
  //   text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1',''], // Adjusted values for 9 categories 
  //   textinfo: 'text',
  //   textposition:'inside',
  //   marker: {colors:['#85b48a', '#8abb8f', '#8cbf88', '#b7cc92', '#d5e49d', '#e5e7b3', '#e9e6ca', '#f4f1e5','#f8f3ec', '#fff']}, // Changed colors 
  //   labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1',''], // Adjusted values for 9 categories 
  //   hoverinfo: 'label',
  //   type: 'pie',
  //   showlegend: false
  // }];

  // var layout = {
  //   title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week'  // Changed title
  // };

  // Plotly.newPlot('self_made', data, layout);

}; 



// Define function which handles Test Subject ID chagnes
function optionChanged(id) {

  d3.csv("Resources/forbes_billionaires_geo.csv").then((data) => {

    // Create Demographic Info box for selected ID
    buildInfoBox(id, data);

    // // Create Bar Chart for selected ID
    // buildBarChart(id, data);

    // // Create Gauge Chart for selected ID
    // buildPieChart(id, data);

    // // Create Bubble Chart for selected ID
    // buildBubbleChart(id, data);
  });
};


// POPULATE THE PAGE UPON FIRST LOAD //

d3.csv("Resources/forbes_billionaires_geo.csv").then(function(data, err) {
  if (err) throw err;


  var names = [];

  // console.log(data);

  data.forEach(element => {
        names.push(element.Name);
  });

    // // Get available Test Subject IDs
    // var testSubjectIDs = data.names;

  // Get a reference to the select element
  var selectMenu = d3.select("#selDataset");

  // Populate list of the avaialable options for the Test Subject ID numbers
  names.forEach(element => {
      selectMenu.append("option").text(element);
  });     
    
  // Get ID number of the first record in the dataset
  var id = names[0];

  console.log(id);

  // Create Demographic Info box for the first record in the dataset
  buildInfoBox(id, data);

    // // Create Bar Chart for the first record in the dataset
    // buildBarChart(id, data);

  country = "Sweden";
    // // Create Gauge Chart for the first record in the dataset
  buildPieChart(country, data);

  // // Create Gauge Chart for the first record in the dataset
  buildStatusPieChart(country, data);

    // // Create Bubble Chart for the first record in the dataset
    // buildBubbleChart(id, data);
});