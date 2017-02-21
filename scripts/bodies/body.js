
import React, { Component } from 'react';

import Matter from 'matter-js';


export class Body extends Component {

	constructor(props) {
		super(props)

		this.collisions = {}
	}

	componentDidMount() {
		this.body.sleepThreshold = this.props.alwaysAwake ? Infinity : 30
		this.body.render.fillStyle = "#fff"

		Matter.World.add(this.context.engine.world, this.body)
		Matter.Events.on(this.body, "collisionStart", this.onCollisionStart.bind(this))
		Matter.Events.on(this.body, "collisionEnd", this.onCollisionEnd.bind(this))
	}

	componentWillUnmount() {
		Matter.World.remove(this.context.engine.world, this.body)
		Matter.Events.off(this.body, "collisionStart", this.onCollisionStart)
		Matter.Events.off(this.body, "collisionEnd", this.onCollisionEnd)
	}

	componentWillReceiveProps(nextProps) {
		// Matter.Sleeping.set(this.body, false)
		// Matter.Body.setPosition(this.body, {x: nextProps.x, y: nextProps.y})
	}

	onCollisionStart(event) {
		this.collisions[event.id] = event.collision
		if (this.props.onCollisionStart) {
			this.props.onCollisionStart(event)
		}
	}

	onCollisionEnd(event) {
		delete this.collisions[event.id]
		if (this.props.onCollisionEnd) {
			this.props.onCollisionEnd(event)
		}
	}



	applyForce(forceX, forceY) {
		Matter.Body.applyForce(this.body, this.body.position, {x: forceX, y: forceY})
	}

	isOnTheGround() {
		for (var key in this.collisions) {
			if (this.collisions[key].normal.y < -0.5) {
				return true
			}
		}
		
		return false
	}

	render() {
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



