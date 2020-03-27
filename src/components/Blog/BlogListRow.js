import React, { Component } from 'react';
import { Link } from 'gatsby';
import { Card } from 'react-bootstrap';

import styles from './BlogListRow.module.scss';

class BlogListRow extends Component {
  isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;  
    }
  }

  render() {
    console.log(this.props.blog);

    if (this.props.blog) {
      let blog = this.props.blog;

      return (
        <Link to={ `/blog/${blog.id}` } className={ styles.blogListItem }>
          <Card style={{ width: '12rem' }}>
            <Card.Img className={ styles.blogListImg } variant="top" src="https://cdn.oceanwp.org/wp-content/uploads/2017/07/portfolio-image.png" />
            <Card.Body>
              <Card.Title>Tutorial</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      );
    } else {
      return <div></div>;
    }
  }
}

export default BlogListRow;
