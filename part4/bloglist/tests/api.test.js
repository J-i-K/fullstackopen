const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const testBlogs = helper.testBlogs
    .map(blog => new Blog(blog))
  const promiseArray = testBlogs.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('getAllBlogs', () => {
  test('correct amount of blogs are returned', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then((response) => {
        expect(response.body).toHaveLength(helper.testBlogs.length)
      })
  }, 10000)

  test('id property is included', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String)
            })
          ])
        )
      })
  }, 10000)
})

describe('createNewBlog', () => {
  const newBlog = {
    author: 'AuthorNew',
    title: 'BlogNew',
    url: 'https://localhostNew'
  }

  test('POST results in status 201 and content-type is json', async () => {
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('Number of logs is increased by 1', async () => {
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .then(async () => {
        await api.get('/api/blogs/')
          .expect(200)
          .expect('Content-Type', /application\/json/)
          .then(getResponse => {
            expect(getResponse.body).toHaveLength(helper.testBlogs.length + 1)
          })
      })
  }, 10000)

  test('Created blog matches the one sent', async () => {
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .then(response => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: response.body.id,
            author: newBlog.author,
            title: newBlog.title,
            url: newBlog.url
          })
        )
      })
  }, 10000)

  test('If created blog is missing likes property, it will default to 0', async () => {
    delete newBlog.likes
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .then(response => {
        expect(response.body).toEqual(
          expect.objectContaining({
            likes: 0
          })
        )
      })
  }, 10000)

  test('If the blog to be created is missing title, return 400', async () => {
    delete newBlog.title
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)
  }, 10000)

  test('If the blog to be created is missing url, return 400', async () => {
    delete newBlog.url
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)
  }, 10000)
})

describe('Delete blog with id', () => {
  const newBlog = {
    author: 'AuthorToBeDeleted',
    title: 'BlogToBeDeleted',
    url: 'https://localhostToBeDeleted'
  }

  test('Delete a blog with an id', async () => {
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .then(async response => {
        await api.delete(`/api/blogs/${response.body.id}`)
          .expect(204)
      })
  })

  test('Delete a blog with an invalid id returns 404', async () => {
    await api.delete('/api/blogs/64024a78c6c1840cdb3e39a3')
      .expect(404)
  })

  test('Delete a blog without any id return 404', async () => {
    await api.delete('/api/blogs')
      .expect(404)
  })
})
  
afterAll(async () => {
  await mongoose.connection.close()
})