document.addEventListener('DOMContentLoaded', function() {
    var dataSet = [
        {minute: 0, percentage: 21.99},
        {minute: 1, percentage: 16.98},
        {minute: 2, percentage: 21.03},
        // Add more data points here...
    ];

    var svgWidth = 600, svgHeight = 400;
    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    var svg = d3.select("#lineChart").append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear().domain([0, d3.max(dataSet, d => d.minute)]).range([0, width]);
    var y = d3.scaleLinear().domain([0, d3.max(dataSet, d => d.percentage)]).range([height, 0]);

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    svg.append("g")
      .call(d3.axisLeft(y));

    var line = d3.line()
      .x(d => x(d.minute))
      .y(d => y(d.percentage));

    svg.append("path")
      .datum(dataSet)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line)
      .attr("stroke-dasharray", function() {
          var totalLength = this.getTotalLength();
          return totalLength + " " + totalLength;
      })
      .attr("stroke-dashoffset", function() {
          return this.getTotalLength();
      })
      .transition()
        .duration(4000)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0);
});
