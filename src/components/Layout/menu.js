import React from 'react'
import { Link } from 'gatsby'
import { Image } from 'react-bootstrap';

import styles from './menu.module.scss';

import Nav from './nav'
import Footer from '../Footer/footer'

export default ({ children }) => (
	<div>
		<header>
			<h1 className="display-4">
				<Link to='/'>Mesh</Link>
			</h1>
		</header>
		<Nav />
		<div id={ styles.siteIcons }>
			<a href="https://github.com/meshu-dev" target="_blank">
				<Image src="/github-icon.png" />
			</a>
			<a href="https://www.linkedin.com/in/harmeshuppal" target="_blank">
				<Image src="/linkedin-icon.png" />
			</a>
		</div>
		<Footer>
			Built with <a href="https://www.gatsbyjs.org" target="_blank">
				<Image src="/gatsby-logo.png" id={ styles.gatsbyLogo } />
			</a>
		</Footer>
	</div>
)
