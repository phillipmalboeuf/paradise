
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
				<Character x={900} y={300} 
					currentIndex={this.state.currentIndex}
					changeIndex={this.changeIndex.bind(this)} />

				<Plane index={1} currentIndex={this.state.currentIndex}>
					<Room x={600} y={400} h={700}>	
						
					</Room>
				</Plane>

				<Plane index={2} currentIndex={this.state.currentIndex}>
					<Room x={1200} y={400} h={700}>	
					
					</Room>
				</Plane>
			</World>
		)
	}
}