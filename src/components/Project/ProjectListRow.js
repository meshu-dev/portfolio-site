import React, { Component } from 'react';
import { Link } from 'gatsby';
import { Card } from 'react-bootstrap';

import styles from './ProjectListRow.module.scss';

class ProjectListRow extends Component {
  isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;  
    }
  }

  render() {
    console.log(this.props.project);

    if (this.props.project) {
      let project = this.props.project;

      return (
        <Link to={ `/project/${project.id}` } className={ styles.projectListItem }>
          <Card style={{ width: '12rem' }}>
            <Card.Img className={ styles.projectListImg } variant="top" src="https://cdn.oceanwp.org/wp-content/uploads/2017/07/portfolio-image.png" />
            <Card.Body>
              <Card.Title>Mailer API</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      );
    } else {
      return <div></div>;
    }
  }
}

export default ProjectListRow;
