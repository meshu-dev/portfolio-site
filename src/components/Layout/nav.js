import React, { Component } from 'react';
import { globalHistory } from "@reach/router"
import Nav from 'react-bootstrap/Nav'

import styles from './nav.module.scss';

class NavMenu extends Component {
  render() {
  	let currentPath = globalHistory.location.pathname,
  			activeKey = currentPath.replace(/\/$/, "");

    return (
			<Nav id={ styles.navMenu } className="flex-column" activeKey={ activeKey }>
			  <div><Nav.Link href="/about">About</Nav.Link></div>
			  <div><Nav.Link href="/projects">Projects</Nav.Link></div>
			  <div><Nav.Link href="/contact">Contact</Nav.Link></div>
			</Nav>
    );
  }
}

export default NavMenu;
