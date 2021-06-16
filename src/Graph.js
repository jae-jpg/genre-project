import './App.css';
import * as d3 from 'd3';
import React from 'react';
import { Link, withRouter } from 'react-router-dom'

class Graph extends React.Component {
  constructor(props) {
    super(props)
    // Are we on the home page? If so:
      // - use a larger scale because there is greater variance in the number of subgenres.
      // - center the graph lower down on the page TODO: revisit whether this is correct/necessary
      // - spread the out more horizontally since there is more space on the page (no description/artist list)
    const numChildrenRange = props.maxChildren - props.minChildren
    let range
    if (props.location.pathname === '/') {
      range = [40, 150]
    } else if (numChildrenRange === 0) {
      range = [100, 100]
    } else if (numChildrenRange > 6) {
      range = [20, 160]
    } else {
      range = [20, 100 + numChildrenRange * 5]
    }

    const [x, y] = props.location.pathname === '/' ? [880, 500] : [480, 500]
    const [xForce, yForce] = props.location.pathname === '/' ? [0.065, 0.15] : [0.05, 0.05]

    this.antiCollide = d3.forceSimulation()
      .force('x', d3.forceX(x).strength(xForce))
      .force('y', d3.forceY(y).strength(yForce))
      .force('collide', d3.forceCollide((d) => {
        return d.radius * 1.1
      }))
    this.radiusScale = d3.scaleSqrt().domain([props.minChildren, props.maxChildren]).range(range)
    this.genres = props.genres

    this.genres.forEach(d => {
      d.radius = this.radiusScale(d.size)
    })

    this.createForce = this.createForce.bind(this)
    this.redrawForce = this.redrawForce.bind(this)
  }

  componentDidMount() {
    this.createForce()
  }

  componentWillUnmount() {
    const svg = d3.select('svg')
    svg.remove()
  }

  // SVG METHODS
  createForce = () => {
    const defs = d3.select('#container').append('defs')

    const lightGradient = defs.append('linearGradient')
        .attr('id', 'lightGradient')
        .attr('x1', '95%')
        .attr('x2', '40%')
        .attr('y1', '0%')
        .attr('y2', '100%')

    lightGradient.append('stop')
        .attr('offset', '10%')
        .attr('stop-color', '#9100fb')
        .attr('stop-opacity', '1')

    lightGradient.append('stop')
        .attr('offset', '35%')
        .attr('stop-color', '#140043')
        .attr('stop-opacity', '.1')

    lightGradient.append('stop')
        .attr('offset', '80%')
        .attr('stop-color', '#140043')
        .attr('stop-opacity', '.1')        

    lightGradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#09167f')
        .attr('stop-opacity', '1')

    const shadowGradient = defs.append('radialGradient')
      .attr('id', 'shadowGradient')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '80%')
      .attr('fx', '30%')
      .attr('fy', '95%')

    shadowGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#01000d')
      .attr('stop-opacity', '1')

    shadowGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#140043')
      .attr('stop-opacity', '1')      

    const containers = d3
      .selectAll('a.circle')
      .data(this.genres)
      .append('svg')
      .attr('overflow', 'visible')
      
    containers
      .append('circle')
      .attr('r', (d) => d.radius)
      .attr('fill', '#060121')
      .attr('fill-opacity', '1')

    containers
      .append('circle')
      .attr('r', (d) => d.radius)
      .attr('fill', 'url(#lightGradient)')
      .attr('fill-opacity', '1')

    containers
      .append('circle')
      .attr('r', (d) => d.radius)
      .attr('fill', 'url(#shadowGradient)')
      .attr('fill-opacity', '.5')

    containers
      .append('text')
      .text((d) => d.name)
      .attr('text-anchor', 'middle')
      .attr('y', d => this.radiusScale(d.size) / 15)
      .attr('font-family', 'Poppins')
      .attr('font-size', (d) => this.radiusScale(d.size) / 5)
      .attr('fill', '#d0caf9')

      containers
      .append('text')
      .text((d) => `${d.numChildren} subgenres`)
      .attr('text-anchor', 'middle')
      .attr('y', d => this.radiusScale(d.size) / 3.5)
      .attr('font-family', 'Poppins')
      .attr('font-size', (d) => this.radiusScale(d.size) / 10)
      .attr('fill', '#d0caf9')      

    const ticked = () => {
        containers
          .attr('x', (d) => {
            return d.x
          })
          .attr('y', (d) => {
            return d.y
          })
          .attr('r', (d) => {
            return d.radius
          })
      }
      
    this.antiCollide.nodes(this.genres)
      .on('tick', ticked)

  }
  
  redrawForce = () => {
    this.antiCollide.force('collide').initialize(this.genres)
    this.antiCollide.restart()
  }

  render() {
    return (
      <svg id="container" style={{height: '100%', width: '100%'}}>
        {this.genres.map(d => (
          <Link
            key={d.name}
            to={`/genre/${d.name}`}
            className="circle"
            onMouseEnter={() => {
              d.radius *= 1.05
              this.redrawForce()
            }}
            onMouseLeave={() => {
              d.radius /= 1.05
              this.redrawForce()
            }}
          >
          </Link>
        ))}
      </svg>
    )
  }

}

export default withRouter(Graph);
