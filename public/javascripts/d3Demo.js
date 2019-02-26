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
const width = 600;
const height = 400;

const xScale = d3
  .scaleLinear()
  .domain([0, 100])
  .range([0, width]);
function render(subject) {
  console.log(subject);
  d3.select('#chart')
    .selectAll('div')
    .remove();

  d3.select('#chart')
    .selectAll('div')
    .data(data)
    .enter()
    .append('div')
    .attr('class', subject)
    .style('width', d => `${d[subject]}px`);
}
render('math');
