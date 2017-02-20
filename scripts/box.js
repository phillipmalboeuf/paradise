
import React, { Component } from 'react';

import { Rectangle } from './bodies/rectangle.js';


export class Box extends Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {

	}


	render() {
		return (
			<span>Box <Rectangle engine={this.props.engine}
				x={this.props.x}
				y={this.props.y}
				w={this.props.w}
				h={this.props.h} />
			</span>
		)
	}
}

Box.propTypes = {
	x: React.PropTypes.number.isRequired,
	y: React.PropTypes.number.isRequired,
	w: React.PropTypes.number,
	h: React.PropTypes.number
}


Box.defaultProps = {
	w: 100,
	h: 100
}


