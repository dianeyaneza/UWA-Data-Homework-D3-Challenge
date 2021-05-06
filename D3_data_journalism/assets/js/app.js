// @TODO: YOUR CODE HERE!
var cdata = ("assets/data/data.csv")

function init() {
    var selData = d3.select("#scatter");
    d3.csv(cdata).then(function(data) {
    // Visualize the data
    console.log(data);

  });
};




init();
