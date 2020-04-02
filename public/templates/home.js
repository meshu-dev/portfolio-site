import BaseTemplate from './base.js'

class Home extends BaseTemplate
{
	async getBlogs() {
		let blogs = await this.getData('/blogs?sort=desc&limit=3')

		if (blogs && blogs.length > 0) {
			let blogHtml = ''

			blogs.forEach((blog) => {
				blogHtml += this.getListItem(
					blog.title,
					blog.url,
					blog.thumbUrl
				)
			})
			return `<div class="home-list">`+ blogHtml +`</div>`
		}
		return `<div>No blogs available</div>`
	}
	async getProjects() {
		let projects = await this.getData('/projects?sort=desc&limit=3')

		if (projects && projects.length > 0) {
			let projectHtml = ''

			projects.forEach((project) => {
				projectHtml += this.getListItem(
					project.title,
					'/projects/' + project.id,
					project.thumbUrl
				)
			})
			return `<div class="home-list">`+ projectHtml +`</div>`
		}
		return `<div>No projects available</div>`
	}
	getListItem(title, pageUrl, thumbnailUrl) {
		return `
    		<div class="list-item">
    			<a href="${pageUrl}">
    				<img src="${thumbnailUrl}" />
    			</a>
    			<a href="${pageUrl}" class="list-item-title">${title}</a>
    		</div>
		`	
	}
	async render() {
		let profile = await this.getProfile()
		let blogHtml = await this.getBlogs()
		let projectHtml = await this.getProjects()

	    return `
	    	<section id="profile-row">
	    		<div id="profile-pic">
	    			<img src="/assets/images/avatar.png" />
	    		</div>
		    	<div id="profile-info">
		    		<h1>${profile.name}</h1>
		    		<div>${profile.jobTitle}</div>
					<ul id="profile-icons">
						<li>
							<a href="${profile.githubUrl}">
								<img src="/assets/images/github-icon.png" />
							</a>
						</li>
						<li>
							<a href="${profile.linkedInUrl}">
								<img src="/assets/images/linkedin-icon.png" />
							</a>
						</li>
						<li>
							<a href="${profile.email}">
								<img src="/assets/images/email-icon.png" />
							</a>
						</li>
						<li>
							<a href="${profile.cvUrl}">
								<img src="/assets/images/cv-icon.png" />
							</a>
						</li>
					</ul>
					<a href="/about" class="button">About Me</a>
		    	</div>
	    	</section>
	    	<section id="blogs-row">
		    	<h2>Latest Blogs</h2>
		    	${blogHtml}
	    	</section>
	    	<section id="projects-row">
		    	<h2>Projects</h2>
		    	${projectHtml}
	    	</section>
	    `
	}
}

export default Home
