// DEFINE FUNCTIONS //

// Define function which populates Demographic Info box
function buildInfoBox(id, data) {
    // Select metadata for the selected ID

    var filteredMetadata = data.filter(sample => sample.name == id);

    // Get a reference to the demographic info element
    var demographicInfo = d3.select("#sample-metadata");

    // Clear content if exists
    demographicInfo.html("");

    console.log(filteredMetadata);

    keys = Object.keys(filteredMetadata[0]);
    values = Object.values(filteredMetadata[0])

    demographicInfo.append("p").attr("class", "bold").text(`${keys[8]}:`).append("tspan").attr("class", "normal").text(` ${values[8]}`);
    demographicInfo.append("p").attr("class", "bold").text(`${keys[10]}:`).append("tspan").attr("class", "normal").text(` ${values[10]}`);
    demographicInfo.append("p").attr("class", "bold").text(`net worth:`).append("tspan").attr("class", "normal").text(` ${values[9]} b$`);
    demographicInfo.append("p").attr("class", "bold").text(`self made:`).append("tspan").attr("class", "normal").text(` ${values[11]}`);
    demographicInfo.append("p").attr("class", "bold").text(`${keys[13]}:`).append("tspan").attr("class", "normal").text(` ${values[13]}`);
    demographicInfo.append("p").attr("class", "bold").text(`${keys[2]}:`).append("tspan").attr("class", "normal").text(` ${values[2]}`);
    demographicInfo.append("p").attr("class", "bold").text(`${keys[11]}:`).append("tspan").attr("class", "normal").text(` ${values[11]}`);
    demographicInfo.append("p").attr("class", "bold").text(`${keys[6]}:`).append("tspan").attr("class", "normal").text(` ${values[6]}`);
    demographicInfo.append("p").attr("class", "bold").text(`${keys[14]}:`).append("tspan").attr("class", "normal").text(` ${values[14]}`);
    demographicInfo.append("p").attr("class", "bold").text(`${keys[1]}:`).append("tspan").attr("class", "normal").text(` ${values[1]}`);

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

// {
//  0 "age": 57, 
//  1 "children": 4, 
//  2 "citizenship": "United States", 
//  3 "combined": "jeff-bezos", 
//  4 "country": "United States", 
//  5 "degree": "Bachelor of Arts/Science", 
//  6 "education": "Bachelor of Arts/Science, Princeton University", 
//  7 "id": 0, 
//  8 "name": "Jeff Bezos", 
//  9 "networth": "177.0", 
//  10 "rank": 1, 
//  11 "residence": "Seattle, Washington", 
//  12 "self_made": "true", 
//  13 "source": "Amazon", 
//  14 "status": "In Relationship", 
//  15 "university": " Princeton University"
// }, 

// 0 name
// 1 networth	
// 2 country
// 3 source	
// 4 rank	
// 5 age	
// 6 residence
// 7 citizenship	
// 8 status	
// 9 children	
// 10 education	
// 11 self_made	
// 12 degree	
// 13 university	
// 14 longitude	
// 15 latitude	
// 16 combined	


// Define function which creates Horizontal Bar Chart
function buildBarChart(country, data) {

  var plotData = [];

  if (country === "All") {

    plotData = data;

  } else {

    // Fitler data for the selected ID
    plotData = data.filter(sample => sample.country == country);

  }

  // Slice the first 10 objects for plotting
  var slicedBarChartData = plotData.slice(0, 10);

  // Define trace parameters
  var trace = {
      x: slicedBarChartData.map(object => object.name),
      y: slicedBarChartData.map(object => object.networth),
      text: slicedBarChartData.map(object => `Rank: ${object.rank}`),
      type: "bar",
      marker: {color:'#91b6c6'}
  };

  // Assign data for plot
  var plotData = [trace];

  // Define layout parameters
  var layout = {
      yaxis: { title: `<b>Net Worth b$</b>`},
      width: 900,
      height: 500
  };

  // Render the plot to the div tag with id "bar"
  Plotly.newPlot("bar", plotData, layout);

};



function buildStatusPieChart(country, data) {

  var plotData = [];

  if (country === "All") {

    plotData = data;

  } else {

    // Fitler data for the selected ID
    plotData = data.filter(sample => sample.country == country);

  }

  // console.log(plotData);

  // Create set of unique values from dataset for each filter
  var unique = new Set(plotData.map(x => x["status"]));

  // Get unique set values
  var setValues= unique.values();

  // Create empty object to store unique values
  var uniqueValuestest = {};

  // Save each unique value in an array
  for (var i = 0; i < unique.size; i++) {
      // uniqueValues.push(setValues.next().value);
      uniqueValuestest[setValues.next().value] = 0;
  };

  // console.log(uniqueValuestest);

  plotData.forEach((event) => {

    if (Object.values(event)[14] === null) {
                
      uniqueValuestest["null"] += 1;
      // console.log("nullllll");

    } else {

      Object.entries(uniqueValuestest).forEach(([key, value]) => {

        if (Object.values(event)[14] === key) {
              
          uniqueValuestest[key] += 1;

        };
      }); 

    };

  }); 

  delete Object.assign(uniqueValuestest, {["Unknown"]: uniqueValuestest[null]})[null];

  console.log(uniqueValuestest);

  var colors = {
    "Married": '#b55c52', 
    "Unknown": '#eff0eb',
    "Divorced": '#95c281',
    "Widowed": '#4f8b67',
    "Single": '#fb4949',
    "In Relationship": '#bfb6b1',
    "Separated": '#676664',
    "Widowed, Remarried": '#91b6c6',
    "Engaged": '#fc8186'
  };

  var currentColors = {};

  Object.keys(uniqueValuestest).forEach((test) => {

    Object.entries(colors).forEach(([key, value]) => {

        if (key === test) {
          
          currentColors[test] = value;

        };

    });
  });

  var trace1 = {
    labels: Object.keys(uniqueValuestest),
    values: Object.values(uniqueValuestest),
    type: 'pie',
    // marker: {colors:['#a3b7a9', '#b55c52']}
    marker: {colors:Object.values(currentColors)}
  };

  var data = [trace1];

  var layout = {
    title: "<b>Marital Status</b>",
    width: 550,
    height: 550
  };

  Plotly.newPlot("status", data, layout);
  
}; 


function buildPieChart(country, data) {

  var plotData = [];

  if (country === "All") {

    plotData = data;

  } else {

    // Fitler data for the selected ID
    plotData = data.filter(sample => sample.country == country);

  }

  var results = { 
    Yes: 0,
    No: 0
  };

  // Add keys and values from the metadata for selected ID into the Info Box
  plotData.forEach((event) => {

        if (Object.values(event)[12] == "true") {
          results.Yes += 1;
        } else {
          results.No += 1;
        };

  });

  // console.log(results);

  var colors = {
    "Yes": '#739076',
    "No": '#eff0eb'
  };

  var currentColors = {};

  Object.keys(results).forEach((test) => {

    Object.entries(colors).forEach(([key, value]) => {

        if (key === test) {
          
          currentColors[test] = value;

        };

    });
  });

  var trace1 = {
    labels: Object.keys(results),
    values: Object.values(results),
    type: 'pie',
    marker: {colors:Object.values(currentColors)}
  };

  var data = [trace1];

  var layout = {
    title: "<b>Self Made</b>",
    width: 500,
    height: 500
  };

  Plotly.newPlot("self_made", data, layout);

}; 


// Define function which handles Test Subject ID chagnes
function optionChanged(id) {

  d3.json("/test").then((data) => {

    // Create Demographic Info box for selected ID
    buildInfoBox(id, data);

  });
};


// Define function which handles Test Subject ID chagnes
function countryChanged(country) {

  console.log(country);

  d3.json("/test").then((data) => {

    // Create Bar Chart for selected ID
    buildPieChart(country, data);

    // Create Gauge Chart for selected ID
    buildStatusPieChart(country, data);

    // Create Bar Chart for selected ID
    buildBarChart(country, data);

  });

};

// // Define function which creates Horizontal Bar Chart
// function test() {

//   d3.json("/test").then(function(data) {

//     var datatest = data;

//     console.log(datatest);

//   });

// };


// POPULATE THE PAGE UPON FIRST LOAD //

d3.json("/test").then(function(data, err) {
  if (err) throw err;

  var names = [];

  // console.log(data);

  data.forEach(element => {
        names.push(element.name);
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

  // console.log(id);

  // Create Demographic Info box for the first record in the dataset
  buildInfoBox(id, data);

  country = "All";

  // Get a reference to the select element
  var selectCountryMenu = d3.select("#selCountry");

  // Create set of unique values from dataset for each filter
  var uniqueCountry = new Set(data.map(x => x["country"]));

  // Get unique set values
  var setCountryValues = uniqueCountry.values();

  // Create empty array to store unique values
  var uniqueCountryValues = [];

  // Save each unique value in an array
  for (var i = 0; i < uniqueCountry.size; i++) {
    uniqueCountryValues.push(setCountryValues.next().value);
  };

  // console.log(uniqueCountryValues);

  selectCountryMenu.append("option").text("All");

  // Populate list of the avaialable options for the Test Subject ID numbers
  uniqueCountryValues.forEach(element => {
    selectCountryMenu.append("option").text(element);
  }); 

  // Create Gauge Chart for the first record in the dataset
  buildPieChart(country, data);

  // Create Gauge Chart for the first record in the dataset
  buildStatusPieChart(country, data);

  // Create Bar Chart for selected ID
  buildBarChart(country, data);

  buildScatterPlot(data);


});
