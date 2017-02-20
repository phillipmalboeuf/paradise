
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
				showAngleIndicator: true,
				wireframes: false
			}
		})
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
	}

	componentWillUnmount() {
		window.removeEventListener('resize')
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




