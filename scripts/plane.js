
import React, { Component } from 'react';



export class Plane extends Component {

	constructor(props) {
		super(props)
	}

	getChildContext() {
		return { 
			index: this.props.index,
			current: this.props.index === this.props.currentIndex
		}
	}

	componentDidMount() {

	}


	render() {
		return (
			<div>Plane: {this.props.children}
			</div>
		)
	}
}

Plane.childContextTypes = {
	current: React.PropTypes.bool,
	index: React.PropTypes.number
}

Plane.propTypes = {
	current: React.PropTypes.bool
}



