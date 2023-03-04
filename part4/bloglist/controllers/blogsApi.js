const blogsApiRouter = require('express').Router()
const Blog = require('../models/blog')

blogsApiRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsApiRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.title || !blog.url) {
    response.status(400).json({
      error: 'Title and Url are mandatory.'
    })
  } else {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
})

blogsApiRouter.delete('/:id', async (request, response) => {
  const blogId = request.params.id
  const deletedBlog = await Blog.findByIdAndRemove(blogId)
  if (deletedBlog) {
    response.status(204).json({
      status: `Blog with id:${deletedBlog.id} deleted`
    })
  } else {
    response.status(404).json({
      error: 'Not found'
    })
  }
})

blogsApiRouter.put('/:id', async (request, response) => {
  const blogId = request.params.id
  const body = request.body
  if (body.author && body.title && body.url) {
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, body, {new: true, runValidators: true, context: 'query'})
    if (updatedBlog) {
      response.status(200).json(updatedBlog)
    } else {
      response.status(404).json({
        error: 'not found'
      })
    }
  } else {
    response.status(400).json({
      error: 'invalid request'
    })
  }
})

module.exports = blogsApiRouter