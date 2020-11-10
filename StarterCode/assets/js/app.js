// @TODO: YOUR CODE HERE!
// Set up chart:
function makeResponsive(){
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//Create an SVG wrapper:

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data from the csv file
// =================================
d3.csv("assets/data/data.csv")
    .then(function(stateData){
    stateData.forEach(function(data){
        data.poverty  = +data.poverty;
        data.healthcare = +data.healthcare;
        data.abbr = data.abbr;

});

// Create X and Y scales

    var xLinearScale = d3.scaleLinear()
        .domain([8.5, d3.max(stateData, d => d.poverty)])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([3.5, d3.max(stateData, d => d.healthcare)])
        .range([height, 0]);

// Create axis and append it to ChartGroup
    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

    chartGroup.append("g")
    .call(yAxis);

//Make Circles
var circlesGroup = chartGroup.selectAll("circle")
.data(stateData)
.enter()
.append("circle")
.attr("cx", d => xLinearScale(d.poverty))
.attr("cy", d => yLinearScale(d.healthcare))
.attr("r", 10)
.attr("fill", "lightblue")
.attr("opacity", ".6")
.attr("stroke-width", "1")
.attr("stroke", "black");

console.log(stateData);
console.log(stateData.poverty);

chartGroup.select("g")
.selectAll("circle")
.data(stateData)
.enter()
.append("text")
.text(d => d.abbr)
.attr("x", d => xLinearScale(d.poverty))
.attr("y", d => yLinearScale(d.healthcare))
.attr("dy",-395)
.attr("text-anchor", "middle")
.attr("font-size", "12px")
.attr("fill", "black");

chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - 50)
      .attr("x", 0 -250)
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2.5}, ${height + margin.top + 25})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");



});
}
makeResponsive();
