import React from 'react'
import Layout from '../components/Layout/layout'
import ProjectList from '../components/Project/ProjectList'

export default ({ location, projectId }) => (
  <Layout>
  	<div>{ location }</div>
  	<div>{ projectId }</div>
    <ProjectList />
  </Layout>
)