import React from 'react'
import { Link } from 'gatsby'
import styles from '../styles/components/menu.module.scss';

import Header from './header'
import Nav from './nav'
import Footer from './footer'

export default ({ children }) => (
	<div>
		<header>
			<h1 class="display-4">
				<Link to='/'>Mesh</Link>
			</h1>
		</header>
		<Nav />
		<Footer>
			Built with GatsbyJS
		</Footer>
	</div>
)
