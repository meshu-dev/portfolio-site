class BaseTemplate
{
	#apiUrl

	constructor(apiUrl) {
	    if (new.target === BaseTemplate) {
	    	throw new TypeError('BaseTemplate class cannot be instantiated')
	    }
		if (this.render === undefined) {
			throw new TypeError('Render method must be defined')
		}
		this.#apiUrl = apiUrl
	}
	async getData(path) {

		console.log('url: '+ this.#apiUrl + path);

		let response = await fetch(this.#apiUrl + path)
		return await response.json()
	}
	async getProfile() {
		let responseData = await this.getData('/profiles?name=Mesh')
		return responseData[0]
	}
}

export default BaseTemplate
