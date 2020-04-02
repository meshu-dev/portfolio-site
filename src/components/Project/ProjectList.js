import React, { Component } from 'react';
import { StaticQuery, graphql } from 'gatsby'
import Title from '../Layout/title'
import ProjectListRow from './ProjectListRow'
import styles from './ProjectList.module.scss';

class ProjectList extends Component {
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
            allProject(limit: 9, sort: {fields: createdAt, order: DESC}) {
              edges {
                node {
                  id
                  title
                  url
                  thumbUrl
                  createdAt
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `}
        render = {data => (
          <div id={ styles.projectsList }>
            <div id={styles.projectsListItems}>{ this.getData(data) }</div>
          </div>
        )}
      />
    );
  }
}

export default ProjectList;
