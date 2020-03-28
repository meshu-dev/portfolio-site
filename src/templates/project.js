import React from 'react';
import { graphql } from 'gatsby'
import Layout from '../components/Layout/layout'
import Title from '../components/Layout/title'

export default ({ data }) => {
    return (
      <Layout>
        <Title text={ data.project.title } />
        <div>HALO INFINITE 3</div>
        <div>{ data.project.id }</div>
        <div>{ data.project.thumbUrl }</div>
      </Layout>
    )
}

export const query = graphql`
  query($slug: String!) {
    project(fields: { slug: { eq: $slug } }) {
      id
      url
      title
      thumbUrl
    }
  }
`
