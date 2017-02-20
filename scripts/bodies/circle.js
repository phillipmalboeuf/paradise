
import React, { Component } from 'react';
import Matter from 'matter-js';

import { Body } from './body.js'

export class Circle extends Body {

	constructor(props) {
		super(props)

		this.body = Matter.Bodies.circle(this.props.x, this.props.y, this.props.r, {
			isStatic: this.props.static ? true : false
		})
	}
}


Circle.propTypes = {
	x: React.PropTypes.number.isRequired,
	y: React.PropTypes.number.isRequired,
	r: React.PropTypes.number.isRequired,
	static: React.PropTypes.bool
}

