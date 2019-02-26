const data = [
  { name: 'Alice', math: 93, science: 84 },
  { name: 'Bobby', math: 81, science: 97 },
  { name: 'Carol', math: 74, science: 88 },
  { name: 'David', math: 64, science: 76 },
  { name: 'Emily', math: 80, science: 94 },
];
// create a scale to map scores to bar widths
// test scores are stored as percentages
// a score of 100 should create a full-width bar

// D3 margin convention
const margin = { top: 10, right: 10, bottom: 20, left: 50 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;
// Scale the size of the cart to the following SCALES
const xScale = d3
  .scaleLinear()
  .domain([0, 100])
  .range([0, width]);

const yScale = d3
  .scaleBand()
  .domain(data.map(d => d.name))
  .range([0, height]);

function render(subject) {
  // store a reference to EXISTING bars already on the chart
  const bars = d3
    .select('#chart')
    .selectAll('div') // this won't be empty after the first time this function runs
    .data(
      data,
      d => d.name // use the name property to match across updates
    )
    .attr('class', subject);

  // NEW Bars ENTER, extends bars
  const newBars = bars
    .enter() // use the enter selection
    .append('div') // to add new bars for any data items without an existing DOM element
    .attr('class', subject)
    .style('width', 0); // set the initial width to 0

  // combine the selections of NEW and EXISTING bars
  // so you can act on them together
  newBars
    .merge(bars)
    .transition()
    // animate everything that comes after this line!
    // pass the score through the linear scale function
    .style('width', d => `${xScale(d[subject])}px`)
    .style('height', d => `${yScale.bandwidth() - 2}px`);
}

// SVG is needed for chart axis
const svg = d3
  .select('#chart')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .style('position', 'absolute')
  .style('top', 0)
  .style('left', 0);

const axisContainer = svg
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

axisContainer
  .append('g')
  .attr('transform', `translate(0, ${height})`)
  .call(d3.axisBottom(xScale));
axisContainer.append('g').call(d3.axisLeft(yScale)); // we don't have to move this at all now

// svg
//   .append('g')
//   .attr('transform', `translate(0, ${height - 20})`)
//   .call(d3.axisBottom(xScale));
// svg
//   .append('g')
//   .attr('transform', `translate(50, 0)`)
//   .call(d3.axisLeft(yScale));

render('math');
