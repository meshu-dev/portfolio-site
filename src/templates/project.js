import React from 'react';
import { graphql } from 'gatsby'
import Layout from '../components/Layout/layout'
import Title from '../components/Layout/title'
import { Image, Badge } from 'react-bootstrap';

import styles from './project.module.scss';

export default ({ data }) => {
    const repositories = [], technologies = [];

    if (data.project.technologies) {
      for (let key in data.project.technologies) {
        let technology = data.project.technologies[key];

        technologies.push(
          <Badge key={ key } variant="secondary">{ technology }</Badge>
        );
      }
    }

    if (data.project.repositories) {
      for (let key in data.project.repositories) {
        const repositoryUrl = data.project.repositories[key];

        repositories.push(
          <a
            key={ key }
            href={ repositoryUrl }
            target="_blank"
            rel="noopener noreferrer"
          >
            { repositoryUrl }
          </a>
        );
      }
    }

    return (
      <Layout title={ `Portfolio | ${data.project.title}` }>
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
            repositories.length > 0
            ?
            <div id={ styles.repositories }>
              <span>Repositories</span>
              <div>
                { repositories }
              </div>
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
      repositories
      imageUrl
    }
  }
`
