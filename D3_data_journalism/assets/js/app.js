// @TODO: YOUR CODE HERE!
var cdata = ("assets/data/data.csv")

function init() {
    var selData = d3.select("#scatter");
    d3.csv(cdata).then(function(data) {
    // Visualize the data
    console.log(data);
  });
};

var width = parseInt(d3.select("#scatter").style("width"));
var height = width - width / 3.9;
var labelArea = 110;
var margin = 20;

var tPadBot = 40;
var tPadLeft = 40;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "chart");
  console.log(width);
  console.log(height);




init();
