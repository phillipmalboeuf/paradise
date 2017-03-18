
import React, { Component } from 'react'

import Matter from "matter-js"
import { spriteArrays } from "../data/sprites.js"

export class Body extends Component {

	constructor(props) {
		super(props)

		this.collisions = {}
	}

	componentDidMount() {
		this.body.sleepThreshold = this.props.alwaysAwake ? Infinity : 30

		Matter.World.add(this.context.engine.world, this.body)
		Matter.Events.on(this.body, "collisionStart", this.onCollisionStart.bind(this))
		Matter.Events.on(this.body, "collisionEnd", this.onCollisionEnd.bind(this))
		
		if (this.props.spriteSheet) {
			Matter.Events.on(this.context.engine, "afterStep", this.updateSprite.bind(this))
		} else {
			this.body.render.fillStyle = "#fff"
		}
		
	}

	componentWillUnmount() {
		Matter.World.remove(this.context.engine.world, this.body)
		Matter.Events.off(this.body, "collisionStart", this.onCollisionStart)
		Matter.Events.off(this.body, "collisionEnd", this.onCollisionEnd)

		if (this.props.spriteSheet) {
			Matter.Events.off(this.context.engine, "afterStep", this.updateSprite)
		}
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

	updateSprite(event) {
		if (event == undefined || event.timestep % this.spriteStep == 0) {
			if (!this.spriteArray.frames[this.spriteArrayIndex]) { this.spriteArrayIndex = 0 }

			this.body.render.sprite.width = this.spriteArray.frames[this.spriteArrayIndex].frame.w
			this.body.render.sprite.height = this.spriteArray.frames[this.spriteArrayIndex].frame.h
			this.body.render.sprite.x = this.spriteArray.frames[this.spriteArrayIndex].frame.x
			this.body.render.sprite.y = this.spriteArray.frames[this.spriteArrayIndex].frame.y

			this.spriteArrayIndex += 1
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

		if (this.props.spriteSheet) {
			this.spriteArray = spriteArrays[this.props.spriteSheet]
			this.spriteArrayIndex = 0
			this.spriteStep = 60 / this.props.spriteFPS
			
			this.body.render.sprite.texture = `/files/images/sprites/${this.props.spriteSheet}.png`
			// this.body.render.sprite.xScale = (this.body.bounds.max.y - this.body.bounds.min.y) / this.spriteArray.frames[0].frame.h
			// this.body.render.sprite.yScale = (this.body.bounds.max.y - this.body.bounds.min.y) / this.spriteArray.frames[0].frame.h
			this.body.render.sprite.xScale = 1
			this.body.render.sprite.yScale = 1
			this.body.render.sprite.angle = 0
			this.body.render.sprite.horizontalFlip = this.props.spriteHorizontalFlip

			this.updateSprite()
		}

		this.body.render.opacity = this.context.current ? 1 : 0.1

		this.body.collisionFilter.mask = this.context.index
		this.body.collisionFilter.category = this.context.index

		return null
	}
}


Body.propTypes = {
	x: React.PropTypes.number.isRequired,
	y: React.PropTypes.number.isRequired,
	static: React.PropTypes.bool,
	spriteFPS: React.PropTypes.number,
	spriteHorizontalFlip: React.PropTypes.bool
}

Body.defaultProps = {
	spriteFPS: 30,
	spriteHorizontalFlip: false
}

Body.contextTypes = {
	engine: React.PropTypes.object,
	current: React.PropTypes.bool,
	index: React.PropTypes.number
}



