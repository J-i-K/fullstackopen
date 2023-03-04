const blogsApiRouter = require('express').Router()
const Blog = require('../models/blog')
const user = require('../models/user')
const User = require('../models/user')

blogsApiRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  .populate('user', {username:1, name: 1})
  response.json(blogs)
})

blogsApiRouter.post('/', async (request, response) => {
  if (!request?.user?._id) {
    return response.status(401).json({
        error: 'invalid token'
    })
  }
  const body = request.body
  const user = request.user

  if (user) {
    const blog = new Blog({
      author: body.author,
      title: body.title,
      url: body.url,
      user: user.id
    })

    if (!blog.title || !blog.url) {
        response.status(400).json({
        error: 'Title and Url are mandatory.'
        })
    } else {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog)
    }
  } else {
    response.status(409).json({
        error: 'looks like data is missing'
    })
  }
})

blogsApiRouter.delete('/:id', async (request, response) => {
  if (!request?.user?._id) {
    return response.status(401).json({
        error: 'invalid token'
    })
  }
  const blogId = request.params.id
  const toBeDeletedBlog = await Blog.findById(blogId)
  if (toBeDeletedBlog) {
    if (toBeDeletedBlog.user.toString() === request.user._id.toString()) {
      const deletedBlog = await Blog.findByIdAndRemove(toBeDeletedBlog._id.toString())
      if (deletedBlog) {
        response.status(204).json({
          status: `Blog with id:${deletedBlog.id} deleted`
        })
      }
    } else {
        response.status(403).json({
            error: 'Forbidden'

        })
    }
  } else {
    response.status(404).json({
      error: 'Not found'
    })
  }
})

blogsApiRouter.put('/:id', async (request, response) => {
  if (!request?.user?._id) {
    return response.status(401).json({
        error: 'invalid token'
    })
  }
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