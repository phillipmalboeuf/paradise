
import React, { Component } from 'react';

import { Rectangle } from './bodies/rectangle.js';


export class Room extends Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {

	}


	render() {
		return (
			<div>Room: 
				<Rectangle engine={this.props.engine}
					x={this.props.x-(this.props.w/2)}
					y={this.props.y}
					w={this.props.wallThickness}
					h={this.props.h}
					opacity={0} static/>
				<Rectangle engine={this.props.engine}
					x={this.props.x}
					y={this.props.y-(this.props.h/2)}
					w={this.props.w}
					h={this.props.wallThickness}
					opacity={0} static/>
				<Rectangle engine={this.props.engine}
					x={this.props.x+(this.props.w/2)}
					y={this.props.y}
					w={this.props.wallThickness}
					h={this.props.h}
					opacity={0} static/>
				<Rectangle engine={this.props.engine}
					x={this.props.x}
					y={this.props.y+(this.props.h/2)}
					w={this.props.w}
					h={this.props.wallThickness}
					opacity={0} static/>
				<Rectangle engine={this.props.engine}
					x={this.props.x}
					y={this.props.y}
					w={this.props.w}
					h={this.props.h}
					spriteSheet="room1"
					spriteScale={0.8} nocollisions static/>

				{this.props.children}
			</div>
		)
	}
}

Room.propTypes = {
	x: React.PropTypes.number.isRequired,
	y: React.PropTypes.number.isRequired,
	w: React.PropTypes.number,
	h: React.PropTypes.number,
	wallThickness: React.PropTypes.number
}


Room.defaultProps = {
	w: 1000,
	h: 1000,
	wallThickness: 10
}


