import React from 'react'
import { Link } from 'gatsby'

import styles from './menu.module.scss';

import Header from '../Header/header'
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
		<Footer>
			Built with GatsbyJS
		</Footer>
	</div>
)
