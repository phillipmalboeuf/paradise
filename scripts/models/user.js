
import { Model } from './model.js';
import { Cookies } from '../utilities/cookies.js';


export class User extends Model {

	constructor() {
		super()

		this.endpoint = '/users'

		this.id = Cookies.get('User-Id')
	}

	fetchMaps() {
		return fetch(this.endpoint + '/' + this.id + '/maps',
			{
				headers: this.headers(),
				credentials: 'include',
				method: 'GET'
			}).then( (response) => {
				return response.json()
			}).then( (json) => {
				this.maps = json
				return this.maps
			})
	}
}