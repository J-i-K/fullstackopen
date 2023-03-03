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
  
afterAll(async () => {
  await mongoose.connection.close()
})