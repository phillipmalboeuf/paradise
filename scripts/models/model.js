
import { Cookies } from '../utilities/cookies.js';


export class Model {

	constructor() {
		this.endpoint = '/models'
		this.attributes = {}
	}

	headers() {
		return {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'X-Session-Secret': Cookies.get('Session-Secret')
		}
	}

	fetch() {
		return fetch(this.endpoint + '/' + this.id,
			{
				headers: this.headers(),
				credentials: 'include',
				method: 'GET'
			}).then( (response) => {
				return response.json()
			}).then( (json) => {
				this.attributes = json
				return this
			})
	}

	save(data) {
		let url = this.endpoint
		let method = 'POST'

		if (this.id) {
			url += '/' + this.id
			method = 'PUT'	
		}
		
		return fetch(url,
			{
				headers: this.headers(),
				method: method,
				credentials: 'include',
				body: JSON.stringify(data)
			}).then( (response) => {
				return response.json()
			}).then( (json) => {
				this.id = json._id
				this.attributes = json
				return this
			})
	}

	destroy() {
		return fetch(this.endpoint + '/' + this.id,
			{
				headers: this.headers(),
				credentials: 'include',
				method: 'DELETE'
			}).then( (response) => {
				return response.json()
			}).then( (json) => {
				this.id = {}
				this.attributes = {}
				return this
			})
	}

}