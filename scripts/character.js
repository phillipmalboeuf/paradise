
import React, { Component } from 'react';
import Matter from 'matter-js';
import key from 'keymaster';

import { Circle } from './bodies/circle.js';


export class Character extends Component {

	constructor(props) {
		super(props)
		this.state = {
			speed: "stopped",
			facingRight: false
		}
	}

	getChildContext() {
		return { 
			current: true,
			index: this.props.currentIndex
		}
	}

	move() {


		// if((key.isPressed("left") || key.isPressed("a")) && this.circle.isOnTheGround()) {
		if((key.isPressed("left") || key.isPressed("a"))) {
			this.circle.applyForce(-0.01, 0)
		}

		// if((key.isPressed("right") || key.isPressed("d")) && this.circle.isOnTheGround()) {
		if((key.isPressed("right") || key.isPressed("d"))) {
			this.circle.applyForce(0.01, 0)
		}

		if (this.circle.body.speed <= 1) {
			if (this.state.speed != "stopped") {this.setState({speed: "stopped"})}
		} else if (this.circle.body.speed > 4) {
			if (this.state.speed != "fast") {this.setState({speed: "fast"})}
		} else if (this.circle.body.speed > 1) {
			if (this.state.speed != "slow") {this.setState({speed: "slow"})}
		}

		if (this.circle.body.velocity.x > 0.1) {
			if (!this.state.facingRight) {this.setState({facingRight: true})}
		} else if (this.circle.body.velocity.x < -0.1) {
			if (this.state.facingRight) {this.setState({facingRight: false})}
		}
	}

	jump() {
		this.move()

		if (this.circle.isOnTheGround()) {
			this.circle.applyForce(0, -0.13)
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
		Matter.Events.on(this.context.engine, 'afterStep', this.move.bind(this))

		key("space, up, w", this.jump.bind(this))
		key("enter", this.enter.bind(this))
	}

	componentWillUnmount() {
		Matter.Events.off(this.context.engine, 'afterStep', this.move)

		key.unbind("space, up, w", this.jump)
		key.unbind("enter", this.enter)
	}


	render() {
		return (
			<div>Character
				<Circle ref={(circle) => { this.circle = circle }}
					spriteSheet={this.state.speed == "stopped" ? "idle" : this.state.speed == "slow" ? "run" : "sprint"}
					spriteHorizontalFlip={this.state.facingRight}
					x={this.props.x} y={this.props.y} r={48}
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

