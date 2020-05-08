import React from "react"
import { Container } from 'react-bootstrap';
import Layout from '../components/Layout/layout'


import styles from '../styles/pages/index.module.scss';

export default ({ data }) => (
  <Layout title="Portfolio">
    <Container id={ styles.content }>
      <div>
        <div id={ styles.line1 }>{ data.allProfile.nodes[0].introLine1 }</div>
        <div id={ styles.line2 }>{ data.allProfile.nodes[0].introLine2 }</div>
      </div>
    </Container>
  </Layout>
)

export const query = graphql`
  {
    allProfile(filter: {name: {eq: "Mesh"}}) {
      nodes {
        introLine1
        introLine2
      }
    }
  }
`
