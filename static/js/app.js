// DEFINE FUNCTIONS //

// Define function which populates billionaire info box
function buildInfoBox(id, data) {

    // Filter data for the selected billionaire 
    var filteredMetadata = data.filter(sample => sample.name == id);

    // Get a reference to the info element
    var demographicInfo = d3.select("#sample-metadata");

    // Clear content if exists
    demographicInfo.html("");

    // Get keys and values from the filtered data
    keys = Object.keys(filteredMetadata[0]);
    values = Object.values(filteredMetadata[0])

    // Populate info box with data
    demographicInfo.append("p").attr("class", "bold").text(`name:`).append("tspan").attr("class", "normal").text(` ${values[11]}`);
    demographicInfo.append("p").attr("class", "bold").text(`rank:`).append("tspan").attr("class", "normal").text(` ${values[13]}`);
    demographicInfo.append("p").attr("class", "bold").text(`age:`).append("tspan").attr("class", "normal").text(` ${values[0]}`);
    demographicInfo.append("p").attr("class", "bold").text(`net worth:`).append("tspan").attr("class", "normal").text(` ${values[12]} b$`);
    demographicInfo.append("p").attr("class", "bold").text(`self made:`).append("tspan").attr("class", "normal").text(` ${values[15]}`);
    demographicInfo.append("p").attr("class", "bold").text(`source:`).append("tspan").attr("class", "normal").text(` ${values[16]}`);
    demographicInfo.append("p").attr("class", "bold").text(`citizenship:`).append("tspan").attr("class", "normal").text(` ${values[2]}`);
    demographicInfo.append("p").attr("class", "bold").text(`residence:`).append("tspan").attr("class", "normal").text(` ${values[14]}`);
    demographicInfo.append("p").attr("class", "bold").text(`education:`).append("tspan").attr("class", "normal").text(` ${values[5]}`);
    demographicInfo.append("p").attr("class", "bold").text(`status:`).append("tspan").attr("class", "normal").text(` ${values[17]}`);
    demographicInfo.append("p").attr("class", "bold").text(`children:`).append("tspan").attr("class", "normal").text(` ${values[1]}`);
};

// Define function which creates Horizontal Bar Chart
function buildBarChart(country, data) {

  // Initialize an empty array for chart data
  var plotData = [];

  // If "All" is selected assign all data to chart data
  if (country === "All") {
    plotData = data;
  } else {
    // Filter data for the selected country
    plotData = data.filter(sample => sample.country == country);
  }

  // Initialize an empty array to store selected info for bar chart
  var chartData = [];

  // Add selected data to the array  
  for (var j = 0; j < plotData.length; j++) {
    chartData.push({
      name: plotData[j].name,
      networth: plotData[j].networth,
      rank: plotData[j].rank
    });
  };

  // Sort the array by rank in ascending order
  var sortedBarChartData= chartData.sort(function compareFunction(a, b) {
    return a.rank - b.rank;
  });
  
  // Slice the first 10 objects for plotting
  var slicedBarChartData = sortedBarChartData.slice(0, 10);

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
      width: 750,
      height: 550,
      margin: {
        l: 50,
        r: 100,
        b: 150,
        t: 0,
        pad: 5
      }
  };

  // Render the plot to the div tag with id "bar"
  Plotly.newPlot("bar", plotData, layout);
};

// Define function which creates Status Bar Chart
function buildStatusPieChart(country, data) {

  // Initialize an empty array to store selected info for pie chart
  var plotData = [];

  // Initialize an empty array to store number of married billionaires
  var total = 0;

  // If "All" is selected assign all data to chart data
  if (country === "All") {
    plotData = data;
    total = Object.keys(data).length;
  } else {
    // Fitler data for the selected country
    plotData = data.filter(sample => sample.country == country);
    total = Object.keys(plotData).length;
  }

  // Create set of unique status values
  var unique = new Set(plotData.map(x => x["status"]));

  // Get unique set values
  var setValues= unique.values();

  // Create empty object to store unique values
  var uniqueValues = {};

  // Save each unique status value as object's key
  for (var i = 0; i < unique.size; i++) {
      uniqueValues[setValues.next().value] = 0;
  };

  // Count number of unique status values for selected country
  plotData.forEach((event) => {
    if (Object.values(event)[17] === null) {
      uniqueValues["null"] += 1;
    } else {
      Object.entries(uniqueValues).forEach(([key, value]) => {
        if (Object.values(event)[17] === key) {
          uniqueValues[key] += 1;
        };
      }); 
    };
  }); 

  // Rename 'null' key as 'Unknown'
  delete Object.assign(uniqueValues, {["Unknown"]: uniqueValues[null]})[null];

  // Calculate number of married billionaires for selected country
  var married = uniqueValues.Married/total * 100;

  // Update the text box
  var selectMarried= d3.select("#married");
  selectMarried.text(`${married.toFixed(1)}% of billionaires are married`);

  // Create object with pie chart colors
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

  // Initialize an empty array to store colors for current country
  var currentColors = {};

  // Assign colors for current country
  Object.keys(uniqueValues).forEach((test) => {
    Object.entries(colors).forEach(([key, value]) => {
        if (key === test) {    
          currentColors[test] = value;
        };
    });
  });

  // Define trace parameters
  var trace1 = {
    labels: Object.keys(uniqueValues),
    values: Object.values(uniqueValues),
    type: 'pie',
    marker: {colors:Object.values(currentColors)},
    domain: {x: [0, 3.2]}
  };

  // Assign data for plot
  var data = [trace1];

  // Define layout parameters
  var layout = {
    autosize: false,
    width: 500,
    height: 350,
    margin: {
      l: 50,
      r: 50,
      b: 0,
      t: 0,
      pad: 1
    },
    legend: {
      x: 1,
      y: 0.5
    }
  };

  // Render the plot to the div tag with id "status"
  Plotly.newPlot("status", data, layout);
}; 

// Define function which creates Self Made Pie Chart
function buildPieChart(country, data) {
  
  // Initialize an empty array to store selected info for pie chart
  var plotData = [];

  // Initialize an empty array to store number of married billionaires
  var total = 0;

  // If "All" is selected assign all data to chart data
  if (country === "All") {
    plotData = data;
    total = Object.keys(data).length;
  } else {
    // Fitler data for the selected ID
    plotData = data.filter(sample => sample.country == country);
    total = Object.keys(plotData).length;
  }

  // Create empty object to store self made numbers
  var results = { 
    Yes: 0,
    No: 0
  };

  // Count number of unique self made values for selected country
  plotData.forEach((event) => {
        if (Object.values(event)[15] == "true") {
          results.Yes += 1;
        } else {
          results.No += 1;
        };
  });

  // Calculate number of self made billionaires for selected country
  var selfMade = results.Yes/total * 100;

  // Update the text box
  var selectselfMade = d3.select("#self_made_info");
  selectselfMade.text(`${selfMade.toFixed(1)}% of billionaires are self made`);

  // Create object with pie chart colors
  var colors = {
    "Yes": '#739076',
    "No": '#eff0eb'
  };

  // Initialize an empty array to store colors for current country
  var currentColors = {};

  // Assign colors for current country
  Object.keys(results).forEach((test) => {
    Object.entries(colors).forEach(([key, value]) => {
        if (key === test) {        
          currentColors[test] = value;
        };
    });
  });

  // Define trace parameters
  var trace1 = {
    labels: Object.keys(results),
    values: Object.values(results),
    type: 'pie',
    marker: {colors:Object.values(currentColors)},
    domain: {x: [0, 0.75]}
  };

  // Assign data for plot
  var data = [trace1];

  // Define layout parameters
  var layout = {
    autosize: false,
    width: 500,
    height: 350,
    margin: {
      l: 50,
      r: 50,
      b: 0,
      t: 0,
      pad: 1
    },
    legend: {
      x: 1,
      y: 0.5
    }
  };

  // Render the plot to the div tag with id "status"
  Plotly.newPlot("self_made", data, layout);
}; 

// Define function which handles billionaire chagnes
function optionChanged(id) {

  d3.json("/test").then((data) => {

    // Call function which populates billionaire info box
    buildInfoBox(id, data);

  });
};

// Define function which handles country chagnes
function countryChanged(country) {

  d3.json("/test").then((data) => {

    // Create Self Made Pie Chart for selected country
    buildPieChart(country, data);

    // Create Status Pie Chart for selected country
    buildStatusPieChart(country, data);

    // Create Bar Chart for selected country
    buildBarChart(country, data);

    // Initialize an empty array to store number of billionaires for selected country
    var number = [];

    // Initialize an empty variable to store sum of net worth for selected country
    var total = 0;

    // Count all billionaires
    var allNumber = Object.keys(data).length;

    // Count sum of total net worth
    var allTotal = data.reduce(function (a, currentValue) {
      return a + parseFloat(currentValue.networth);
    }, 0);

    if (country === "All") {
      number = allNumber;
      total = allTotal;
    } else {
      // Fitler data for the selected ID and count number of billionaires and sum of net worth
      plotData = data.filter(sample => sample.country == country);
      number = Object.keys(plotData).length;
      total = plotData.reduce(function (a, currentValue) {
        return a + parseFloat(currentValue.networth);
      }, 0);
    }

    // Calculate % of billionaires for selected country
    var pctTotal = total / allTotal * 100;
    // Calculate % of net worth for selected country
    var pctNumber = number / allNumber * 100;

    // Update the text boxes
    var selectnumber = d3.select("#number");
    selectnumber.html(`${number} &nbsp;&nbsp;  (${pctNumber.toFixed(2)}%)`);

    var selecttotal = d3.select("#total");
    selecttotal.html(`b$ ${total.toFixed(1)} &nbsp;&nbsp;  (${pctTotal.toFixed(2)}%)`);
  });
};

// POPULATE THE PAGE UPON FIRST LOAD //
d3.json("/test").then(function(data, err) {
  if (err) throw err;
  
  // Initialize an empty array to store billionaires' names
  var names = [];

  // Populate names array
  data.forEach(element => {
        names.push(element.name);
  });

  // Sort names in alphabetical order
  names.sort(function(a, b){
    if(a < b) { return -1; }
    if(a > b) { return 1; }
    return 0;
  })

  // Get a reference to the billionaires' names select element
  var selectMenu = d3.select("#selDataset");

  // Populate list of the available names
  names.forEach(element => {
      selectMenu.append("option").text(element);
  });     
    
  // Get ID number of the first record in the dataset
  var id = names[0];

  // Create billionaires info box for the first record in the dataset
  buildInfoBox(id, data);

  // Set initially selected country to "All"
  var country = "All";

  // Get a reference to the select country element
  var selectCountryMenu = d3.select("#selCountry");

  // Create set of unique country values from dataset
  var uniqueCountry = new Set(data.map(x => x["country"]));

  // Get unique set values
  var setCountryValues = uniqueCountry.values();

  // Create empty array to store unique values
  var uniqueCountryValues = [];

  // Save each unique country value in an array
  for (var i = 0; i < uniqueCountry.size; i++) {
    uniqueCountryValues.push(setCountryValues.next().value);
  };

  // Sort countries in alphabetical order
  uniqueCountryValues.sort(function(a, b){
    if(a < b) { return -1; }
    if(a > b) { return 1; }
    return 0;
  })

  // Add "All" option to the available countries list
  selectCountryMenu.append("option").text("All");

  // Populate list of the available countries
  uniqueCountryValues.forEach(element => {
    selectCountryMenu.append("option").text(element);
  }); 

  // Create Gauge Chart for the first record in the dataset
  buildPieChart(country, data);

  // Create Gauge Chart for the first record in the dataset
  buildStatusPieChart(country, data);

  // Create Bar Chart for selected ID
  buildBarChart(country, data);
});