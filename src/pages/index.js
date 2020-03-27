import React from "react"
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Layout from '../components/Layout/layout'

export default () => (
  <Layout>
    <Container>
      <Row>
        <Col>
          <h1>Intro</h1>
          <p>A card is a flexible and extensible content container. It includes options for 
          headers and footers, a wide variety of content, contextual background colors, and 
          powerful display options. If you’re familiar with Bootstrap 3, cards replace our 
          old panels, wells, and thumbnails. Similar functionality to those components is 
          available as modifier classes for cards.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Latest projects</h1>
          <div>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Latest blogs</h1>
        </Col>
      </Row>
    </Container>
  </Layout>
)
