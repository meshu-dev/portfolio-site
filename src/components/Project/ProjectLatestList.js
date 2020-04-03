import React, { Component } from 'react';
import { Link, StaticQuery, graphql } from 'gatsby'

import ProjectListRow from './ProjectListRow'
import styles from './ProjectLatestList.module.scss';

class ProjectLatestList extends Component {
  getData(data) {
    let projects = data.allProject.edges

    if (projects.length > 0) {
      return this.getProjects(projects)
    } else {
      return <div>No projects available</div>
    }
  }

  getProjects(projects) {
    let rows = [];

    for (let project of projects) {
      project = project.node;

      console.log('project', project);

      rows.push(<ProjectListRow key={ project.id } project={ project } />);
    }
    return rows;
  }

  render() {
    return (
      <StaticQuery
        query = {graphql `
          query {
            allProject(limit: 3, sort: {fields: createdAt, order: DESC}) {
              edges {
                node {
                  id
                  title
                  thumbUrl
                  createdAt,
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `}
        render = {data => (
          <div id={styles.latestProjects}>
            <h1>Latest projects</h1>
            <div id={styles.latestProjectsItems}>{ this.getData(data) }</div>
            <Link id={styles.latestProjectsMoreLink} to='/projects'>View All</Link>
          </div>
        )}
      />
    );
  }
}

export default ProjectLatestList;
