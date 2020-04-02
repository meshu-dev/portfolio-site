import React, { Component } from 'react';
import { Link } from 'gatsby';
import { Card, Image } from 'react-bootstrap';

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
        <Link to={ `/${project.fields.slug}` } state={{ fromFeed: true }} className={ styles.projectListItem }>
          <Image src={ project.thumbUrl } className={ styles.projectListImg } rounded fluid />
          <div className={ styles.projectListTitle }>{ project.title }</div>
        </Link>
      );
    } else {
      return <div></div>;
    }
  }
}

export default ProjectListRow;
