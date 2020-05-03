const path = require('path')
const axios = require('axios')
const https = require('https')

/**
 Was getting the following error althought these endpoints are public
 so ssl check isn't required

 Error: FetchError: request to https://api.meshu.site/profiles?name=Mesh failed,
        reason: unable to verify the first certificate
*/
const instance = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
})

const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'

require("dotenv").config({
  path: `.env.${activeEnv}`,
})

let addProfileNode = async (createNode, createContentDigest) => {
  let result = await instance.get(`${process.env.PORTFOLIO_API_URL}/profiles?name=Mesh`),
      resultData = result.data

  resultData = resultData[0];

  createNode({
    id: resultData.id,
    name: resultData.name,
    introLine1: resultData.introLine1,
    introLine2: resultData.introLine2,
    bio: resultData.bio,
    githubUrl: resultData.githubUrl,
    linkedInUrl: resultData.linkedInUrl,
    cvUrl: resultData.cvUrl,
    createdAt: resultData.createdAt,
    updatedAt: resultData.updatedAt,
    parent: null,
    children: [],
    internal: {
      type: `Profile`,
      contentDigest: createContentDigest(resultData)
    }
  })
}

let addProjectNodes = async (createNode, createContentDigest) => {
  let result = await instance.get(`${process.env.PORTFOLIO_API_URL}/projects`),
      resultData = result.data;

  const defaultThumbUrl = 'https://cdn.oceanwp.org/wp-content/uploads/2017/07/portfolio-image.png',
        defaultImageUrl = 'https://cdn.oceanwp.org/wp-content/uploads/2017/07/portfolio-image.png';

  for (let project of resultData) {
    const projectImages = project.images && project.images[0] ? project.images[0] : null;
    const technologies = project.technologies ? project.technologies : ['Code'];

    createNode({
      id: project.id,
      title: project.title,
      description: project.description,
      technologies: technologies,
      repositories: project.repositories,
      imageUrl: projectImages ? projectImages['imageUrl'] : defaultImageUrl,
      thumbUrl: projectImages ? projectImages['thumbUrl'] : defaultThumbUrl,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      parent: null,
      children: [],
      internal: {
        type: `Project`,
        contentDigest: createContentDigest(project)
      }
    })
  }
}

let addBlogNodes = async (createNode, createContentDigest) => {
  let result = await instance.get(`${process.env.PORTFOLIO_API_URL}/blogs`),
      resultData = result.data

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
        contentDigest: createContentDigest(blog)
      }
    })
  }
}

// Create node data from data pulled from Portfolio API
exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest
}) => {
  await addProfileNode(createNode, createContentDigest)
  await addProjectNodes(createNode, createContentDigest)
  await addBlogNodes(createNode, createContentDigest)
}

// Generate a slug and set as a new field to project data
exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === 'Project') {
    const { createNodeField } = actions;

    let title = node.title,
        slug = title.replace(' ', '-').toLowerCase()

    createNodeField({
       node,
       name: 'slug',
       value: slug
    });
  }
}

// Functions used for creating project view pages
let createProjectViewPages = (allProjects, createPage) => {
  allProjects.data.allProject.edges.forEach(({ node }) => {
    createPage({
       path: node.fields.slug,
       component: path.resolve('./src/templates/project.js'),
       context: {
         slug: node.fields.slug
       }
     })
  })
};

let getAllProjectSlugs = async (graphql) => {
  return await new Promise(resolve => {
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
      resolve(result);
    })
  });
};

// Functions used for creating project list pages
let getTotalPages = async (graphql) => {
  let result = await new Promise(resolve => {
    graphql(`
      {
        allProject {
          totalCount
        }
      }`
    ).then(result => {
      resolve(result);
    })
  });

  let totalProjects = result.data.allProject.totalCount;
  return Math.ceil(totalProjects / process.env.ITEMS_PER_PAGE);
};

let createProjectListPages = (totalPages, createPage) => {
  for (let page = 1; page <= totalPages; page++) {
    let itemsPerPage = parseInt(process.env.ITEMS_PER_PAGE),
        skip = page - 1;

    if (skip > 0) skip *= itemsPerPage;

    createPage({
       path: `/projects/${page}`,
       component: path.resolve('./src/templates/projects.js'),
       context: {
         skip: skip,
         itemsPerPage: itemsPerPage
       }
     })
  }
};

// Create static pages on projects based on slug
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  let projectSlugs = await getAllProjectSlugs(graphql);
  createProjectViewPages(projectSlugs, createPage);

  let totalPages = await getTotalPages(graphql);
  createProjectListPages(totalPages, createPage);
}
