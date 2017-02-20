
import { Model } from './model.js';
import { Cookies } from '../utilities/cookies.js';


export class Session extends Model {

	constructor() {
		super()

		this.endpoint = '/sessions'

		this.id = Cookies.get("Session-Id")
	}


	login(data) {
		return this.save(data).then(()=> {
			Cookies.set("Session-Id", this.attributes._id)
			Cookies.set("Session-Secret", this.attributes.secret)
			Cookies.set("User-Id", this.attributes.user_id)

			return this
		})
	}

	logout() {
		return this.destroy().then(()=> {
			Cookies.delete("Session-Id")
			Cookies.delete("Session-Secret")
			Cookies.delete("User-Id")
			Cookies.delete("Token-Id")

			return this
		})
	}
}


