const blogsApiRouter = require('express').Router()
const Blog = require('../models/blog')

blogsApiRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsApiRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save()
    .then(savedBlog => {
      response.status(201).json(savedBlog)
    })
})

module.exports = blogsApiRouter