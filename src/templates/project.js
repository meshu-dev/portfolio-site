import React from 'react';
import { graphql } from 'gatsby'
import Layout from '../components/Layout/layout'
import Title from '../components/Layout/title'
import { Image, Badge } from 'react-bootstrap';

import styles from './project.module.scss';

export default ({ data }) => {
    let technologies = [];

    if (data.project.technologies) {
      for (let key in data.project.technologies) {
        let technology = data.project.technologies[key];

        technologies.push(
          <Badge key={ key } variant="secondary">{ technology }</Badge>
        );
      }
    }

    return (
      <Layout>
        <div id={ styles.projectView }>
          <Title text={ data.project.title } />
          <Image src={ data.project.imageUrl } rounded fluid />
          {
            data.project.technologies
            ?
            <div id={ styles.technologies }>
              { technologies }
            </div>
            :
            ''
          }
          {
            data.project.githubUrl
            ?
            <div id={ styles.githubUrl }>
              <span>Github repository:</span>
              <a href={ data.project.githubUrl } target="_blank">{ data.project.githubUrl }</a>
            </div>
            :
            ''
          }
          <div id={ styles.description }>
            { data.project.description }
          </div>
        </div>
      </Layout>
    )
}

export const query = graphql`
  query($slug: String!) {
    project(fields: { slug: { eq: $slug } }) {
      id
      title
      description
      technologies
      githubUrl
      imageUrl
    }
  }
`
