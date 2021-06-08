function buildScatterPlot(forebesData) {

    // set the dimensions and margins of the graph 
    var margin = {top: 20, right: 70, bottom: 100, left: 120},
    width = 860 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);


    forebesData.forEach(function(data) {
        data.networth = +data.networth;
        data.age = +data.age;
    });
    
    // xLinearScale function above csv import
    var xLinearScale = d3.scaleLinear()
        .domain(d3.extent(forebesData, d => d.age))
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(forebesData, d => d.networth - 10), d3.max(forebesData, d => d.networth)])
        .range([height, 0]);
    
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .attr("transform", `translate(${width},0)`)
        .call(leftAxis); 

        //try x = age, y = net worth 
    var circlesGroup = chartGroup.selectAll("circle")
        .data(forebesData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.age))
        .attr("cy", d => yLinearScale(d.networth))
        .attr("r", 8)
        .attr("fill", "#8FD175") //#8FD175  #D18975
        .attr("opacity", ".7");
    
    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
        return (` ${d.name} <br><strong> Net Worth $ : ${d.networth} <strong><br><hr> Age: ${d.age}`);
    });

    chartGroup.call(toolTip);

    circlesGroup.on("click", function(d) {
        toolTip.show(d, this);
    })
    //top 10 > 70 
    // top 200 > 20 ; rest 
    circlesGroup.on("mouseover", function() {
        d3.select(this)
        .transition()
        .duration(200)
        .style("fill", function(d){
            if (d.networth > 70) {
                return "#440154ff";} 
            else if (d.networth > 20) { 
                return "#21908dff";}
            else {
                return "#8FD175";
            }
        });
    })

    circlesGroup.on("mouseout", function() {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("fill", "#8FD175");
    });
      
    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("fill", "green")
        .classed("axis-text", true)
        .text("Age");
    
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("font-size", "16px")
        .attr("dy", "1em")
        .attr("fill", "blue")
        .classed("axis-text", true)
        .text("Net Worth $"); 
  
}; 