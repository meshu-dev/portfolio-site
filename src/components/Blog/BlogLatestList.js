import React, { Component } from 'react';
import { StaticQuery, graphql } from 'gatsby'

import BlogListRow from './BlogListRow'
import styles from './BlogLatestList.module.scss';

class BlogLatestList extends Component {
  getData(data) {
    let blogs = data.allBlog.edges

    if (blogs.length > 0) {
      return this.getBlogs(blogs)
    } else {
      return <div>No blogs available</div>
    }
  }

  getBlogs(blogs) {
    let rows = [];

    for (let blog of blogs) {
      blog = blog.node;
      rows.push(<BlogListRow key={ blog.id } blog={ blog } />);
    }
    return rows;
  }

  render() {
    return (
      <StaticQuery
        query = {graphql `
          query {
            allBlog(limit: 3, sort: {fields: createdAt, order: DESC}) {
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
          <div id={ styles.latestBlogs }>
            <h1>Latest blogs</h1>
            <div>{ this.getData(data) }</div>
          </div>
        )}
      />
    );
  }
}

export default BlogLatestList;
