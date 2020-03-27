import React, { Component } from 'react';
import { StaticQuery, graphql } from 'gatsby'

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
                  url
                  thumbUrl
                  createdAt
                }
              }
            }
          }
        `}
        render = {data => (
          <div>
            <h1>Latest projects</h1>
            <div id={styles.latestProjects}>{ this.getData(data) }</div>
          </div>
        )}
      />
    );
  }
}

export default ProjectLatestList;
