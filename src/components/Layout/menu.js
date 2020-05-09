import React, { Component } from 'react';
import { StaticQuery, Link, graphql } from 'gatsby'
import { Image } from 'react-bootstrap';

import styles from './menu.module.scss';

import Nav from './nav'
import Footer from '../Footer/footer'

class Menu extends Component {
  render() {
    return (
      <StaticQuery
	    query={graphql`
	      {
	        allProfile(filter: {name: {eq: "Mesh"}}) {
	          nodes {
	            linkedInUrl
	            githubUrl
	          }
	        }
	      }
	    `}
        render = {data => (
			<div>
				<header>
					<h1 className="display-4">
						<Link to='/'>Mesh</Link>
					</h1>
				</header>
				<Nav />
				<div id={ styles.siteIcons }>
					<a
						href={ data.allProfile.nodes[0].githubUrl }
						target="_blank"
						rel="noopener noreferrer"
					>
						<Image src="/github-icon.png" />
					</a>
					<a
						href={ data.allProfile.nodes[0].linkedInUrl }
						target="_blank"
						rel="noopener noreferrer"
					>
						<Image src="/linkedin-icon.png" />
					</a>
				</div>
			</div>
        )}
      />
    );
  }
}

export default Menu;
