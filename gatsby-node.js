const fetch = require(`node-fetch`)
const path = require('path')

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

let addProfileNode = async (createNode, createContentDigest) => {
  let result = await fetch(`${process.env.PORTFOLIO_API_URL}/profiles?name=Mesh`)
  let resultData = await result.json()
  resultData = resultData[0]

  createNode({
    id: resultData.id,
    name: resultData.name,
    jobTitle: resultData.jobTitle,
    bio: resultData.bio,
    githubUrl: resultData.githubUrl,
    linkedInUrl: resultData.linkedInUrl,
    email: resultData.email,
    cvUrl: resultData.cvUrl,
    createdAt: resultData.createdAt,
    updatedAt: resultData.updatedAt,
    parent: null,
    children: [],
    internal: {
      type: `Profile`,
      contentDigest: createContentDigest(resultData),
    },
  })
}

let addProjectNodes = async (createNode, createContentDigest) => {
  let result = await fetch(`${process.env.PORTFOLIO_API_URL}/projects`)
  let resultData = await result.json()

  const defaultThumbUrl = 'https://cdn.oceanwp.org/wp-content/uploads/2017/07/portfolio-image.png';

  for (let project of resultData) {

    console.log('project', project);

    createNode({
      id: project.id,
      title: project.title,
      url: project.url,
      thumbUrl: project.images[0] ? project.images[0]['thumbUrl'] : defaultThumbUrl,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      parent: null,
      children: [],
      internal: {
        type: `Project`,
        contentDigest: createContentDigest(project),
      },
    })
  }
}

let addBlogNodes = async (createNode, createContentDigest) => {
  let result = await fetch(`${process.env.PORTFOLIO_API_URL}/blogs`)
  let resultData = await result.json()

  for (let blog of resultData) {
    createNode({
      id: blog.id,
      title: blog.title,
      url: blog.url,
      thumbUrl: blog.thumbUrl,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      parent: null,
      children: [],
      internal: {
        type: `Blog`,
        contentDigest: createContentDigest(blog),
      },
    })
  }
}

// Create node data from data pulled from Portfolio API
exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  await addProfileNode(createNode, createContentDigest)
  await addProjectNodes(createNode, createContentDigest)
  await addBlogNodes(createNode, createContentDigest)
}

// Generate a slug and set as a new field to project data
exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === 'Project') {
    const { createNodeField } = actions

    let title = node.title,
        slug = title.replace(' ', '-').toLowerCase()

    createNodeField({
       node,
       name: 'slug',
       value: slug
    });
  }
}

// Create static pages on projects based on slug
exports.createPages = ({ graphql, actions }) => {
   const { createPage } = actions

   return new Promise(resolve => {
      graphql(`
      {
        allProject {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }`
      ).then(result => {
        result.data.allProject.edges.forEach(({ node }) => {
          console.log('CREATE PAGE - PROJECT SLUG', node.fields.slug);

          createPage({
             path: node.fields.slug,
             component: path.resolve('./src/templates/project.js'),
             context: {
               slug: node.fields.slug
             }
           })
        })
        resolve()
      })
   })
}
