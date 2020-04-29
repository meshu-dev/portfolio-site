import React, { Component } from 'react';
import { globalHistory } from "@reach/router"
import Nav from 'react-bootstrap/Nav'

import styles from './nav.module.scss';

class NavMenu extends Component {
  render() {
  	const currentPath = globalHistory.location.pathname
  	let activeKey = currentPath.replace(/\/$/, "")

    if (!activeKey) activeKey = '/'

    return (
			<Nav id={ styles.navMenu } className="flex-column" activeKey={ activeKey }>
        <div><Nav.Link href="/">About</Nav.Link></div>
        <div><Nav.Link href="/projects/1">Projects</Nav.Link></div>
			  <div><Nav.Link href="/contact">Contact</Nav.Link></div>
			</Nav>
    );
  }
}

export default NavMenu;
