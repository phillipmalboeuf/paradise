
import React, { Component } from 'react';

import { Grid } from './grid.js';

export class Form extends Component {

	onSubmit(e) {
		e.preventDefault()
		this.props.onSubmit(e, this.state)
	}

	onChange(e) {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}


	render() {
		return (
			<Grid center>
				<form onSubmit={this.onSubmit.bind(this)}>
					{React.Children.map(this.props.children, (child) => React.cloneElement(child, {onChange: this.onChange.bind(this)}))}
				</form>
			</Grid>
		)
	}
}