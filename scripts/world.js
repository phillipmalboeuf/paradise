
import React, { Component } from 'react';

import Matter from 'matter-js';



export class World extends Component {

	constructor(props) {
		super(props)

		this.e = Matter.Engine.create({
			enableSleeping: true
		})
		this.r = Matter.Render.create({
			element: document.getElementById('world'),
			engine: this.e,
			options: {
				width: window.innerWidth,
				height: window.innerHeight,
				showAngleIndicator: false,
				wireframes: false
			}
		})
		this.timestep = 0
	}

	getChildContext() {
		return { engine: this.e }
	}

	componentDidMount() {
		Matter.Engine.run(this.e)
		Matter.Render.run(this.r)

		window.addEventListener('resize', ()=> {
			this.r.canvas.width = window.innerWidth
			this.r.canvas.height = window.innerHeight
		})

		Matter.Events.on(this.e, "collisionStart", this.onCollisionStart.bind(this))
		Matter.Events.on(this.e, "collisionEnd", this.onCollisionEnd.bind(this))
		Matter.Events.on(this.e, "afterUpdate", this.onAfterUpdate.bind(this))
	}

	componentWillUnmount() {
		window.removeEventListener('resize')

		Matter.Events.off(this.e, "collisionStart", this.onCollisionStart)
		Matter.Events.off(this.e, "collisionEnd", this.onCollisionEnd)
		Matter.Events.off(this.e, "afterUpdate", this.onAfterUpdate)
	}

	onCollisionStart(event) {
		for (var i = event.pairs.length - 1; i >= 0; i--) {
			event.pairs[i]["otherBody"] = event.pairs[i].bodyB
			Matter.Events.trigger(event.pairs[i].bodyA, "collisionStart", event.pairs[i])

			event.pairs[i]["otherBody"] = event.pairs[i].bodyA
			Matter.Events.trigger(event.pairs[i].bodyB, "collisionStart", event.pairs[i])
		}
	}

	onCollisionEnd(event) {
		const otherBody = {}
		for (var i = event.pairs.length - 1; i >= 0; i--) {
			event.pairs[i]["otherBody"] = event.pairs[i].bodyB
			Matter.Events.trigger(event.pairs[i].bodyA, "collisionEnd", event.pairs[i])

			event.pairs[i]["otherBody"] = event.pairs[i].bodyA
			Matter.Events.trigger(event.pairs[i].bodyB, "collisionEnd", event.pairs[i])
		}
	}

	onAfterUpdate(event) {
		event.timestep = this.timestep
		Matter.Events.trigger(this.e, "afterStep", event)
		if (this.timestep === 59) { this.timestep = 0 } else { this.timestep++ }
	}


	render() {
		return (
			<div>
				World: {this.props.children}
			</div>
		)
	}
}


World.childContextTypes = {
	engine: React.PropTypes.object
}




