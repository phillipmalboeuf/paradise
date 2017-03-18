
import { Component } from 'react';

import { World } from './world.js';
import { Character } from './character.js';

import { Plane } from './plane.js';
import { Room } from './room.js';
import { Box } from './box.js';


export class Game extends Component {

	constructor(props) {
		super(props)
		this.state = {
			currentIndex: 1
		}
	}

	changeIndex(index) {
		this.setState({
			currentIndex: index
		})
	}


	render() {
		return (
			<World>
				<Plane index={1} currentIndex={this.state.currentIndex}>
					<Room x={600} y={400} w={750} h={485}>	
						
					</Room>
				</Plane>

				<Plane index={2} currentIndex={this.state.currentIndex}>
					<Room x={1000} y={400} w={750} h={485}>	
					
					</Room>
				</Plane>

				<Character x={400} y={300} 
					currentIndex={this.state.currentIndex}
					changeIndex={this.changeIndex.bind(this)} />
			</World>
		)
	}
}