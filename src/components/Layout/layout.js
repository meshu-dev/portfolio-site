import React from "react"
import { Helmet } from 'react-helmet'
import { Container, Row, Col } from 'react-bootstrap';

import styles from './layout.module.scss';
 
import Menu from './menu'
import Footer from '../Footer/footer'

export default (props) => (
	<div className={ styles.container }>
	    <Helmet>
	      <title>{ props.title }</title>
	    </Helmet>
		<Container>
		  <Row>
		  	<Col id="leftcolumn" sm={3}>
		  		<Menu />
		  	</Col>
		    <Col sm={9}>
		    	{ props.children }
		    	<Footer />
		    </Col>
		  </Row>
		</Container>
	</div>
)
