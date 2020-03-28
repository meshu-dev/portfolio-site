import React from 'react'
import Nav from 'react-bootstrap/Nav'

//import styles from './nav.module.scss';

export default () => (
	<nav>
		<Nav className="flex-column">
		  <Nav.Link href="/about">About</Nav.Link>
		  <Nav.Link href="/projects">Projects</Nav.Link>
		  <Nav.Link href="/contact">Contact</Nav.Link>
		</Nav>
  	</nav>
)
