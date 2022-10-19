async function draw(el, scale) {
  // Data
  const dataset = await d3.json("data.json");

  // Dimensions
  let dimensions = {
    width: 600,
    height: 150,
  };

  const box = 30;

  // Draw Image
  const svg = d3
    .select(el)
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  // Scales
  let colorScale;
  if (scale === "linear") {
    colorScale = d3
      .scaleLinear()
      .domain(d3.extent(dataset))
      .range(["white", "green"]);
  } else if (scale === "quantize") {
    colorScale = d3
      .scaleQuantize()
      .domain(d3.extent(dataset))
      .range(["white", "pink", "red"]);
  } else if (scale === "quantile") {
    colorScale = d3
      .scaleQuantile()
      .domain(dataset)
      .range(["pink", "red", "#c00020"]);
  }

  // Rectangles
  svg
    .append("g")
    .attr("transform", "translate(2,2)")
    .selectAll("rect")
    .data(dataset)
    .join((enter) => {
      return enter
        .append("rect")
        .attr("width", box - 3)
        .attr("height", box - 3)
        .attr("fill", colorScale)
        .attr("x", (d, i) => {
          console.log((i % 20) * box);
          return (i % 20) * box;
        })
        .attr("y", (d, i) => {
          return ((i / 20) | 0) * box;
        })
        .attr("stroke", "black");
    });

  console.log(svg.selectAll("circle"));
}

draw("#heatmap1", "linear");

draw("#heatmap2", "quantize");

draw("#heatmap3", "quantile");
