// D3 Animated Scatter Plot

// Section 1: Pre-Data Setup
// ===========================
// Before we code any data visualizations,
// we need to at least set up the width, height and margins of the graph.
// Note: I also added room for label text as well as text padding,
// though not all graphs will need those specifications.

// Grab the width of the containing box
// var width = parseInt(d3.select("#scatter").style("width"));

// // Designate the height of the graph
// var height = width - width / 3.9;

// // Margin spacing for graph
// var margin = 20;

// // space for placing words
// var labelArea = 110;

// // padding for the text at the bottom and left axes
// var tPadBot = 40;
// var tPadLeft = 40;

// // Create the actual canvas for the graph
// var svg = d3
//   .select("#scatter")
//   .append("svg")
//   .attr("width", width)
//   .attr("height", height)
//   .attr("class", "chart");

// // Set the radius for each dot that will appear in the graph.
// // Note: Making this a function allows us to easily call
// // it in the mobility section of our code.
// var circRadius;
// function crGet() {
//   if (width <= 530) {
//     circRadius = 5;
//   }
//   else {
//     circRadius = 10;
//   }
// }
// crGet();

// // The Labels for our Axes

// // A) Bottom Axis
// // ==============

// // We create a group element to nest our bottom axes labels.
// svg.append("g").attr("class", "xText");
// // xText will allows us to select the group without excess code.
// var xText = d3.select(".xText");

// // We give xText a transform property that places it at the bottom of the chart.
// // By nesting this attribute in a function, we can easily change the location of the label group
// // whenever the width of the window changes.
// function xTextRefresh() {
//   xText.attr(
//     "transform",
//     "translate(" +
//       ((width - labelArea) / 2 + labelArea) +
//       ", " +
//       (height - margin - tPadBot) +
//       ")"
//   );
// }
// xTextRefresh();

// // Now we use xText to append three text SVG files, with y coordinates specified to space out the values.
// // 1. Poverty
// xText
//   .append("text")
//   .attr("y", -26)
//   .attr("data-name", "poverty")
//   .attr("data-axis", "x")
//   .attr("class", "aText active x")
//   .text("In Poverty (%)");
// // 2. Age
// xText
//   .append("text")
//   .attr("y", 0)
//   .attr("data-name", "age")
//   .attr("data-axis", "x")
//   .attr("class", "aText inactive x")
//   .text("Age (Median)");
// // 3. Income
// xText
//   .append("text")
//   .attr("y", 26)
//   .attr("data-name", "income")
//   .attr("data-axis", "x")
//   .attr("class", "aText inactive x")
//   .text("Household Income (Median)");

// // B) Left Axis
// // ============

// // Specifying the variables like this allows us to make our transform attributes more readable.
// var leftTextX = margin + tPadLeft;
// var leftTextY = (height + labelArea) / 2 - labelArea;

// // We add a second label group, this time for the axis left of the chart.
// svg.append("g").attr("class", "yText");

// // yText will allows us to select the group without excess code.
// var yText = d3.select(".yText");

// // Like before, we nest the group's transform attr in a function
// // to make changing it on window change an easy operation.
// function yTextRefresh() {
//   yText.attr(
//     "transform",
//     "translate(" + leftTextX + ", " + leftTextY + ")rotate(-90)"
//   );
// }
// yTextRefresh();

// // Now we append the text.
// // 1. Obesity
// yText
//   .append("text")
//   .attr("y", -26)
//   .attr("data-name", "obesity")
//   .attr("data-axis", "y")
//   .attr("class", "aText active y")
//   .text("Obese (%)");

// // 2. Smokes
// yText
//   .append("text")
//   .attr("x", 0)
//   .attr("data-name", "smokes")
//   .attr("data-axis", "y")
//   .attr("class", "aText inactive y")
//   .text("Smokes (%)");

// // 3. Lacks Healthcare
// yText
//   .append("text")
//   .attr("y", 26)
//   .attr("data-name", "healthcare")
//   .attr("data-axis", "y")
//   .attr("class", "aText inactive y")
//   .text("Lacks Healthcare (%)");

// 2. Import our .csv file.
// ========================
// This data file includes state-by-state demographic data from the US Census
// and measurements from health risks obtained
// by the Behavioral Risk Factor Surveillance System.

// Import our CSV data with d3's .csv import method.
d3.json("/test").then(function(data) {
  // Visualize the data
  console.log(data);
  // visualize(data);

});
