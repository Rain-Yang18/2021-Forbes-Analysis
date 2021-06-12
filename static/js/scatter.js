var svgArea = d3.select("#my_dataviz").select("svg");

if (!svgArea.empty()) {
    svgArea.remove();
}

// Set up the svg params
var svgWidth = 1000;
var svgHeight = 700;

var margin = {
top: 60,
right: 60,
bottom: 110,
left: 60
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);


var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Initial Params
var chosenXAxis = "age";

// Function used for updating x-scale var upon click on axis label
function xScale(forebesData, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(forebesData, d => d[chosenXAxis]) - 5,
            d3.max(forebesData, d => d[chosenXAxis]) +5
        ])
        .range([0, width]);

    return xLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);

    return xAxis;
}

// function used for updating circles group with a transition to new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

    circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[chosenXAxis]));

    return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

    if (chosenXAxis === "age") {
        label = "Age: ";
    }
    else {
        label = "Number of Children: ";
    }

    if (chosenXAxis === "age") {
        var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([80, -60])
        .html(function(d) {
            return (` ${d.name} <br><strong> Net Worth $ : ${d.networth} <strong><br><hr> Age: ${d.age}`);
    });
    }
    else {
        var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([80, -60])
        .html(function(d) {
            return (` ${d.name} <br><strong> Net Worth $ : ${d.networth} <strong><br><hr> Number of children: ${d.children}`);
    });
    }


    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function(data) {
        toolTip.show(data);
    })
    // onmouseout event
    .on("mouseout", function(data, index) {
        toolTip.hide(data);
    });

    return circlesGroup;
}


d3.json("/test").then(forebesData => {

    
    // Preview the data
    // console.log(forebesData);

    // For mat the data
    forebesData.forEach(data => {
        data.networth = +data.networth;
        data.age = +data.age;
        data.children = +data.children;
    });
    
    // xScale = chosenXAxis
    var xLinearScale = xScale(forebesData, chosenXAxis);

    // xLinearScale function above csv import
    var yLinearScale = d3.scaleLinear() //[d3.min(forebesData, d => d.networth - 10)
        .domain([d3.min(forebesData, d => d.networth) - 5, d3.max(forebesData, d => d.networth) + 5])
        .range([height, 0]);
    
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    
    var xAxis = chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis); 
    
    var color = d3.scaleOrdinal()
        .domain(["Over $70 b","Over $20 b","the rest"])
        .range(["#fc8186", "#95c281", "#91b6c6"])
    
    var highlight = function(d){

        selected_billionarie = d.groupednetworth

        // console.log(selected_billionarie);

        d3.selectAll(".dot")
            .transition()
            .duration(200)
            .style("fill", "lightgrey")
            .attr("r", 10)
            .style("fill", color(selected_billionarie));
    }

    //try x = age, y = net worth 
    var circlesGroup = chartGroup.selectAll("circle")
        .data(forebesData)
        .enter()
        .append("circle")
        .attr("class", function(d){return"dot" + d.groupednetworth})
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d.networth))
        .attr("r", 8)
        .style("fill", function(d){return color (d.groupednetworth)})      //attr("fill", "#8FD175") //#8FD175  #D18975
        .attr("opacity", ".5");

    // Select tooltip
    var toolTipArea = d3.select("body").select(".tooltip");
    
    // Remove existing tooltip before rendering a new one
    if (!toolTipArea.empty()) {
        toolTipArea.remove();
    }
    
    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
        return (` ${d.name} <br><strong> Net Worth $ : ${d.networth} <strong><br><hr> Age: ${d.age}`);
    });

    chartGroup.call(toolTip);

    // Set up mouseover & mouseout function to show tooltip
    circlesGroup.on("mouseover", function(d) {
        toolTip.show(d);
    })
        .on("mouseout", function(d) {
            toolTip.hide(d);
        });


    // Create group for the x-axis labels
    var labelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);

    
    var ageLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "age")  // value to grab for event listener
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("font-family", "sans-serif")
        .attr("font-weight", "bold")
        .classed("active", true)
        .classed("axis-text", true)
        .text("Age");

    var childrenLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "children")  // value to grab for event listener
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("font-family", "sans-serif")
        .attr("font-weight", "bold")
        .classed("inactive", true)
        .classed("axis-text", true)
        .style("fill", "grey")
        .text("Number of Children");
    

    // append y axis
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("font-family", "sans-serif")
        .attr("font-weight", "bold")
        .classed("active", true)
        .text("Net Worth $");

    // updateToolTip function
    var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

    // Event listener
    labelsGroup.selectAll("text")
        .on("click", function() {

        // Get value of selection (this)
        var value = d3.select(this).attr("value");
        if (value !== chosenXAxis) {

            // Replaces chosenXAxis with value
            chosenXAxis = value;

            // Updates x scale for new data
            xLinearScale = xScale(forebesData, chosenXAxis);

            // Updates x axis with transition
            xAxis = renderAxes(xLinearScale, xAxis);

            // Updates circles & text with new x values
            circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

            // Updates tooltips with new info
            circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

            // Changes classes to change bold text
            if (chosenXAxis === "age") {
            ageLabel
                    .classed("active", true)
                    .classed("inactive", false)
                    .style("fill", "black");
            childrenLabel
                    .classed("active", false)
                    .classed("inactive", true)
                    .style("fill", "grey");
            }
            else {
            ageLabel
                    .classed("active", false)
                    .classed("inactive", true)
                    .style("fill", "grey");
            childrenLabel
                    .classed("active", true)
                    .classed("inactive", false)
                    .style("fill", "black");
            }
        }
    });
    
}).catch(function(error) {
    console.log(error);
});
