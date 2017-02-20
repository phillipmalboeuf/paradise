
import React, { Component } from 'react';
import Matter from 'matter-js';

import { Body } from './body.js'

export class Rectangle extends Body {

	constructor(props) {
		super(props)

		this.body = Matter.Bodies.rectangle(this.props.x, this.props.y, this.props.w, this.props.h, {
			isStatic: this.props.static ? true : false
		})
	}
}


Rectangle.propTypes = {
	x: React.PropTypes.number.isRequired,
	y: React.PropTypes.number.isRequired,
	h: React.PropTypes.number.isRequired,
	w: React.PropTypes.number.isRequired,
	static: React.PropTypes.bool
}


