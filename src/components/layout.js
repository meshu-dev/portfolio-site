import React from "react"
import styles from '../styles/components/layout.module.scss';

import { Container, Row, Col } from 'react-bootstrap';

import Menu from './menu'

export default ({children}) => (
	<div className={styles.container}>
		<Container>
		  <Row>
		  	<Col sm={3}>
		  		<Menu />
		  	</Col>
		    <Col sm={9}>
		    	{children}
		    </Col>
		  </Row>
		</Container>
	</div>
)
