
import { Component } from 'react';

import { Session } from './models/session.js';
import { User } from './models/user.js';

import { Paragraph } from './paragraph.js';
import { Form } from './form.js';
import { Grid } from './grid.js';
import { Input } from './input.js';
import { Link } from './link.js';
import { Button } from './button.js';
import { MapsList } from './maps_list.js';


export class Welcome extends Component {

	constructor(props) {
		super(props)
		this.state = {
			session: new Session()
		}

		if (this.state.session.id) {
			this.fetchUser()
		}
	}

	fetchUser() {
		const user = new User()
		user.fetch().then((user)=> { 
			this.setState({ user: user })
		})

		user.fetchMaps().then((maps)=> { 
			this.setState({ maps: maps })
		})
	}

	login(e, state) {
		this.state.session.login(state).then((session)=> {
			this.setState({ session: session })
			this.fetchUser()
		})
	}

	logout(e) {
		this.state.session.logout().then((session)=> {
			this.setState({ session: new Session(), user: null, maps: null })
		})
	}


	render() {
		if (this.state.session.id) {
			return (
				<Grid guttered center>
					{this.state.user ? <Paragraph>Welcome {this.state.user.attributes.user_name}!</Paragraph> : <Paragraph>Getting your info...</Paragraph>}
					<Paragraph><Button underline label="Log out" onClick={this.logout.bind(this)} /></Paragraph>

					<MapsList maps={this.state.maps} />
				</Grid>
			)
		} else {
			return (
				<Form center onSubmit={this.login.bind(this)}>
					<Paragraph>Find the hidden gems of your neighborhood and share your collection with your friends.</Paragraph>
					<Input name='email' type='email' label='Email address' placeholder='your.email.address@gmail.com' autofocus required />
					<Input name='password' type='password' label='Password' placeholder='********' required />
					<Button label='Log in' />

					<Button underline label="I don't have an account just yet"  />
				</Form>
			)
		}	
	}
}