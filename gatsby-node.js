const fetch = require(`node-fetch`)

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

  for (let project of resultData) {
    createNode({
      id: project.id,
      title: project.title,
      url: project.url,
      thumbUrl: project.thumbUrl,
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

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  await addProfileNode(createNode, createContentDigest)
  await addProjectNodes(createNode, createContentDigest)
  await addBlogNodes(createNode, createContentDigest)
}
