import React from "react"
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../components/layout'

export default () => (
  <Layout>
    <Container>
      <Row>
        <Col>
          <h1>Intro</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Latest projects</h1>
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
