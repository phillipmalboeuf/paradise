
import React, { Component } from 'react';

import Matter from 'matter-js';

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
			setInterval(this.updateSprite.bind(this), 1000/this.props.spriteFPS)
		} else {
			this.body.render.fillStyle = "#fff"
		}
		
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

	updateSprite(event) {
		// if (parseInt(event.timestamp / 1000 * this.props.spriteFPS) % 1000 != )

		// console.log(parseInt(event.timestamp) % 1000 < 1000 / this.props.spriteFPS)
		
		if (!this.spriteArray.frames[this.spriteArrayIndex]) { this.spriteArrayIndex = 0 }

		this.body.render.sprite.width = this.spriteArray.frames[this.spriteArrayIndex].frame.w
		this.body.render.sprite.height = this.spriteArray.frames[this.spriteArrayIndex].frame.h
		this.body.render.sprite.x = this.spriteArray.frames[this.spriteArrayIndex].frame.x
		this.body.render.sprite.y = this.spriteArray.frames[this.spriteArrayIndex].frame.y

		this.spriteArrayIndex += 1
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
			this.spriteArray = {"frames": [{"filename": "run instance 10000", "frame": {"x":0,"y":0,"w":59,"h":76}, "rotated": false, "trimmed": true, "spriteSourceSize": {"x":0,"y":3,"w":59,"h":79}, "sourceSize": {"w":59,"h":79} } ,{"filename": "run instance 10001", "frame": {"x":0,"y":0,"w":59,"h":76}, "rotated": false, "trimmed": true, "spriteSourceSize": {"x":0,"y":3,"w":59,"h":79}, "sourceSize": {"w":59,"h":79} } ,{"filename": "run instance 10002", "frame": {"x":59,"y":0,"w":59,"h":76}, "rotated": false, "trimmed": true, "spriteSourceSize": {"x":0,"y":0,"w":59,"h":79}, "sourceSize": {"w":59,"h":79} } ,{"filename": "run instance 10003", "frame": {"x":59,"y":0,"w":59,"h":76}, "rotated": false, "trimmed": true, "spriteSourceSize": {"x":0,"y":0,"w":59,"h":79}, "sourceSize": {"w":59,"h":79} } ,{"filename": "run instance 10004", "frame": {"x":59,"y":0,"w":59,"h":76}, "rotated": false, "trimmed": true, "spriteSourceSize": {"x":0,"y":0,"w":59,"h":79}, "sourceSize": {"w":59,"h":79} } ,{"filename": "run instance 10005", "frame": {"x":0,"y":76,"w":59,"h":75}, "rotated": false, "trimmed": true, "spriteSourceSize": {"x":0,"y":3,"w":59,"h":79}, "sourceSize": {"w":59,"h":79} } ,{"filename": "run instance 10006", "frame": {"x":0,"y":76,"w":59,"h":75}, "rotated": false, "trimmed": true, "spriteSourceSize": {"x":0,"y":3,"w":59,"h":79}, "sourceSize": {"w":59,"h":79} } ,{"filename": "run instance 10007", "frame": {"x":0,"y":76,"w":59,"h":75}, "rotated": false, "trimmed": true, "spriteSourceSize": {"x":0,"y":3,"w":59,"h":79}, "sourceSize": {"w":59,"h":79} } ,{"filename": "run instance 10008", "frame": {"x":59,"y":76,"w":59,"h":76}, "rotated": false, "trimmed": true, "spriteSourceSize": {"x":0,"y":0,"w":59,"h":79}, "sourceSize": {"w":59,"h":79} } ,{"filename": "run instance 10009", "frame": {"x":59,"y":76,"w":59,"h":76}, "rotated": false, "trimmed": true, "spriteSourceSize": {"x":0,"y":0,"w":59,"h":79}, "sourceSize": {"w":59,"h":79} } ,{"filename": "run instance 10010", "frame": {"x":59,"y":76,"w":59,"h":76}, "rotated": false, "trimmed": true, "spriteSourceSize": {"x":0,"y":0,"w":59,"h":79}, "sourceSize": {"w":59,"h":79} } ,{"filename": "run instance 10011", "frame": {"x":0,"y":0,"w":59,"h":76}, "rotated": false, "trimmed": true, "spriteSourceSize": {"x":0,"y":3,"w":59,"h":79}, "sourceSize": {"w":59,"h":79} }], "meta": {"app": "Adobe Animate", "version": "15.2.1.95", "image": "run.png", "format": "RGBA8888", "size": {"w":128,"h":256}, "scale": "1"} }
			this.spriteArrayIndex = 0
			this.body.render.sprite.texture = `/files/images/sprites/${this.props.spriteSheet}.png`
			this.body.render.sprite.xScale = (this.body.bounds.max.y - this.body.bounds.min.y) / this.spriteArray.frames[0].frame.h
			this.body.render.sprite.yScale = (this.body.bounds.max.y - this.body.bounds.min.y) / this.spriteArray.frames[0].frame.h
			this.body.render.sprite.angle = 0
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
	static: React.PropTypes.bool
}

Body.contextTypes = {
	engine: React.PropTypes.object,
	current: React.PropTypes.bool,
	index: React.PropTypes.number
}



