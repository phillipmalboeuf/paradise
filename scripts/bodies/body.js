
import React, { Component } from 'react';

import Matter from 'matter-js';


export class Body extends Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		Matter.World.add(this.context.engine.world, this.body)
	}

	componentWillUnmount() {
		Matter.World.remove(this.context.engine.world, this.body)
	}

	applyForce(forceX, forceY) {
		Matter.Body.applyForce(this.body, this.body.position, {x: forceX, y: forceY})
	}

	render() {
		Matter.Sleeping.set(this.body, false)
		Matter.Body.setPosition(this.body, {x: this.props.x, y: this.props.y})

		this.body.render.fillStyle = '#fff'
		this.body.render.opacity = this.context.current ? 1 : 0.1

		this.body.collisionFilter.mask = this.context.index
		this.body.collisionFilter.category = this.context.index

		return null
	}
}


Body.propTypes = {
	x: React.PropTypes.number.isRequired,
	y: React.PropTypes.number.isRequired,
	static: React.PropTypes.bool
}

Body.contextTypes = {
	engine: React.PropTypes.object,
	current: React.PropTypes.bool,
	index: React.PropTypes.number
}



