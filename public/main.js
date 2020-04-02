'use strict'

import Router from './router.js'

import Home        from './templates/home.js'
import About       from './templates/about.js'
import ProjectView from './templates/projectView.js'

let preLoad = () => {
	document.getElementById('layout').style.display = 'none'
	document.getElementById('loader').style.display = 'block'
}

let postLoad = (pageContent) => {
	document.getElementsByTagName('main')[0].innerHTML = pageContent

	document.getElementById('loader').style.display = 'none'
	document.getElementById('layout').style.display = 'block'
}

(async() => {
	let response = await fetch('/data.json')
	let siteData = await response.json()
	let apiUrl = siteData['apiUrl']


	let router = new Router({
		    '/':             new Home(apiUrl),
		    '/about':        new About(apiUrl),
		    '/projects/:id': new ProjectView(apiUrl)
		},
		preLoad,
		postLoad
	)

    if (document.readyState === 'complete') {
        router.goToPage(window.location.href)
    } else {
    	window.addEventListener('load', router.goToPage(window.location.href))
    }
})()
