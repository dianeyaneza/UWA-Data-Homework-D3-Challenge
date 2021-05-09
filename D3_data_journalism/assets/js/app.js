// @TODO: YOUR CODE HERE!
// var cdata = ("assets/data/data.csv")

// function init() {
//     var selData = d3.select("#scatter");
//     d3.csv(cdata).then(function(data) {
//     // Visualize the data
//     console.log(data);
//   });
// };

// svg container
var svgHeight = 500;
var svgWidth = 900;

// margins
var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// var width = parseInt(d3.select("#scatter").style("width"));
// var height = width - width / 3.9;
// var labelArea = 110;
// var margin = 20;

// var tPadBot = 40;
// var tPadLeft = 40;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
//   .attr("class", "chart");
//   console.log(width);
//   console.log(height);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv").then(function(cdata) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    cdata.forEach(function(data) {
        data.age = +data.age;
        data.smokes = +data.smokes;
        // console.log(data.age);
    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([30, d3.max(cdata, d => d.age)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([8, d3.max(cdata, d => d.smokes)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(cdata)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", "10")
    .attr("fill", "green")
    .attr("opacity", ".5");

    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -20])
      .html(function(d) {
        return (`${d.state}<br>Age: ${d.age}<br>Smokes: ${d.smokes}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })

    // onmouseout event
    .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

});

    


// init();
