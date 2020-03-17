import React from "react"
import { Jumbotron, Button } from 'react-bootstrap';
import Layout from '../components/layout'
import Title from '../components/title'

export default ({data}) => (
  <Layout>
  	<Title text='Welcome' />
  	<div>
	    <p>Blah blah blah blah</p>
    </div>
    <div>{data.profile.id}</div>
    <Jumbotron>
      <h1>Title Text</h1>
      <p>Subtitle Text</p>
      <Button>Learn more</Button>
    </Jumbotron>
  </Layout>
)

export const query = graphql `query {
  profile {
    id
  }
}`
