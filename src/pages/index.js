import React from "react"
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../components/Layout/layout'
import ProjectLatestList from '../components/Project/ProjectLatestList'
import BlogLatestList from '../components/Blog/BlogLatestList'

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
          <ProjectLatestList />
        </Col>
      </Row>
      <Row>
        <Col>
          <BlogLatestList />
        </Col>
      </Row>
    </Container>
  </Layout>
)
