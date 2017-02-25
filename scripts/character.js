
import React, { Component } from 'react';
import Matter from 'matter-js';
import key from 'keymaster';

import { Circle } from './bodies/circle.js';


export class Character extends Component {

	constructor(props) {
		super(props)
	}

	getChildContext() {
		return { 
			current: true,
			index: this.props.currentIndex
		}
	}

	move() {
		if((key.isPressed("left") || key.isPressed("a")) && this.circle.isOnTheGround()) {
			this.circle.applyForce(-0.01, 0)
		}

		if((key.isPressed("right") || key.isPressed("d")) && this.circle.isOnTheGround()) {
			this.circle.applyForce(0.01, 0)
		}
	}

	jump() {
		this.move()

		if (this.circle.isOnTheGround()) {
			this.circle.applyForce(0, -0.25)
		}
	}

	enter() {
		// TEST
		if (this.props.currentIndex == 1) {
			this.props.changeIndex(2)
		} else {
			this.props.changeIndex(1)
		}
	}

	componentDidMount() {
		Matter.Events.on(this.context.engine, 'beforeTick', this.move.bind(this))

		key("space, up, w", this.jump.bind(this))
		key("enter", this.enter.bind(this))
	}

	componentWillUnmount() {
		Matter.Events.off(this.context.engine, 'beforeTick', this.move)

		key.unbind("space, up, w", this.jump)
		key.unbind("enter", this.enter)
	}


	render() {
		return (
			<div>Character
				<Circle ref={(circle) => { this.circle = circle }}
					spriteSheet={"run"}
					spriteFPS={20}
					x={this.props.x} y={this.props.y} r={45}
					alwaysAwake />
			</div>
		)
	}
}

Character.propTypes = {
	x: React.PropTypes.number.isRequired,
	y: React.PropTypes.number.isRequired
}

Character.contextTypes = {
	engine: React.PropTypes.object
}

Character.childContextTypes = {
	current: React.PropTypes.bool,
	index: React.PropTypes.number
}

