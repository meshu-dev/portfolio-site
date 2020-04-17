import React from 'react';
import { globalHistory } from "@reach/router"
import { graphql } from 'gatsby'
import Layout from '../components/Layout/layout'
import ProjectListRow from '../components/Project/ProjectListRow'
import { Pagination } from 'react-bootstrap';

import styles from './projects.module.scss';

export default ({ data }) => {
  let getProjects = (projects) => {
    let rows = [];

    for (let project of projects) {
      project = project.node;
      rows.push(<ProjectListRow key={ project.id } project={ project } />);
    }
    return rows;
  }

  let getData = (data) => {
    let projects = data.allProject.edges

    if (projects.length > 0) {
      return getProjects(projects)
    } else {
      return <div>No projects available</div>
    }
  }

  let urlPath = globalHistory.location.pathname,
      pageNo = urlPath.replace('/projects/', '');

  pageNo = parseInt(pageNo);

  let totalProjects = data.allProject.totalCount,
      totalPages =  Math.ceil(totalProjects / process.env.ITEMS_PER_PAGE),
      pages = [];

  for (let page = 1; page <= totalPages; page++) {
    pages.push(
      <Pagination.Item
        key={ page }
        active={ page === pageNo }
        href={ `/projects/${page}` }>
        { page }
      </Pagination.Item>
    );
  }

  return (
    <Layout>
      <div id={ styles.projectsList }>
        <div id={styles.projectsListItems}>{ getData(data) }</div>
      </div>
      <Pagination>{ pages }</Pagination>
    </Layout>
  )
}

export const query = graphql`
  query($skip: Int!, $itemsPerPage: Int!) {
    allProject(sort: {order: DESC, fields: createdAt}, limit: $itemsPerPage, skip: $skip) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          thumbUrl
          githubUrl
          title
        }
      }
    }
  }
`
