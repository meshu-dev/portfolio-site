class Router
{
	constructor(routes, preLoad, postLoad) {
		this.routes = routes
		this.preLoad = preLoad
		this.postLoad = postLoad
		
		this.init()
	}
	init() {
		let loadPage = () => {
		    this.goToPage(window.location.href)
		}

		// Set page when using browser forward and back buttons
		window.onpopstate = loadPage.bind(this)

		// Set page for every a tag click
		window.addEventListener('click', (event) => {
			if (event.target.href) {
				event.preventDefault()
		    	this.goToPage(event.target.href, true)  
			}
		})
	}
	async goToPage(url, addState = false) {
		this.preLoad()

	    let path = url.replace(window.location.origin, '')

	    if (addState === true) {
	        window.history.pushState({}, path, url)
	    }

	    let pageContent = await this.getTemplate(path).render()
	    this.postLoad(pageContent)
	}
	getTemplate(path) {
	    if (this.routes[path] !== undefined) {
	        return this.routes[path]
	    } else {
	        return this.matchParamRoute(path)
	    }
	}
	matchParamRoute(path) {
		let pathParts = path.split('/'),
			paramRoutes = this.getParamRoutes(),
			matchedRoute = null

		for (let key in paramRoutes) {
			let paramRouteParts = path.split('/')
			let isMatching = true

			for (let i in paramRouteParts) {
				let part = paramRouteParts[i]

				if (part !== pathParts[i]) {
					isMatching = false
					break
				}
			}

			if (isMatching === true) {
				return paramRoutes[key]
			}
		}
		return null
	}
	getParamRoutes() {
	    let paramRoutes = []

	    for (let key in this.routes) {
	        if (key.search(':') !== -1) {
	            paramRoutes[key] = this.routes[key]
	        }
	    }
	    return paramRoutes
	}
}

export default Router
