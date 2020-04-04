const fetch = require(`node-fetch`)
const path = require('path')

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

let addProfileNode = async (createNode, createContentDigest) => {
  let result = await fetch(`${process.env.PORTFOLIO_API_URL}/profiles?name=Mesh`),
      resultData = await result.json();

  resultData = resultData[0];

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
      contentDigest: createContentDigest(resultData)
    }
  })
}

let addProjectNodes = async (createNode, createContentDigest) => {
  let result = await fetch(`${process.env.PORTFOLIO_API_URL}/projects`),
      resultData = await result.json();

  const defaultThumbUrl = 'https://cdn.oceanwp.org/wp-content/uploads/2017/07/portfolio-image.png',
        defaultImageUrl = 'https://cdn.oceanwp.org/wp-content/uploads/2017/07/portfolio-image.png';

  for (let project of resultData) {
    createNode({
      id: project.id,
      title: project.title,
      description: project.description,
      technologies: project.technologies,
      githubUrl: project.githubUrl,
      imageUrl: project.images[0] ? project.images[0]['imageUrl'] : defaultImageUrl,
      thumbUrl: project.images[0] ? project.images[0]['thumbUrl'] : defaultThumbUrl,
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
  let result = await fetch(`${process.env.PORTFOLIO_API_URL}/blogs`),
      resultData = await result.json()

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
