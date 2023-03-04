const blogsApiRouter = require('express').Router()
const Blog = require('../models/blog')

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
  const user = request.user
  const toBeDeletedBlog = await Blog.findById(blogId)
  if (toBeDeletedBlog) {
    if (toBeDeletedBlog.user.toString() === user._id.toString()) {
      const deletedBlog = await Blog.findByIdAndRemove(toBeDeletedBlog._id.toString())
      if (deletedBlog) {
        user.blogs = user.blogs.filter(x => x.toString() !== deletedBlog._id.toString())
        await user.save()
        response.status(204).json({
          status: `Blog with id: ${deletedBlog._id.toString()} deleted`
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
  const user = request.user
  if (body.author && body.title && body.url) {
    const toBeUpdatedBlog = await Blog.findById(blogId)
    if (toBeUpdatedBlog) {
      if (toBeUpdatedBlog.user._id.toString() === user._id.toString()) {
        const updatedBlog = await Blog.findByIdAndUpdate(toBeUpdatedBlog._id.toString(), body, {new: true, runValidators: true, context: 'query'})
        if (updatedBlog) {
          response.status(200).json(updatedBlog)
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
  } else {
    response.status(400).json({
      error: 'Invalid request'
    })
  } 
})

module.exports = blogsApiRouter