import BaseTemplate from './base.js'

class About extends BaseTemplate
{
    async render() {
    	let profile = await this.getProfile()

	    return `
	    	<div id="page-header">
		    	<h1>About Me</h1>
		    	<a href="/" id="back-button" class="button">
	                <div id="logo">Home</div>
	            </a>
            </div>
            <div>${profile.bio}</div>
	    `
    }
}

export default About
