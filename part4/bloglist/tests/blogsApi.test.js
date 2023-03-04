const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

let createdUser
let authHeader

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const pwHash = await bcrypt.hash(process.env.PW, 5)
  const user = new User({
    username: 'testuser',
    name: 'User, Test',
    pwHash: pwHash
  })
  createdUser = await user.save()
  if (createdUser) {
    authHeader = await api.post('/api/token')
      .send({
        username: createdUser.username,
        password: process.env.PW
      })
      .expect(200)
      .then(response => authHeader = `Bearer ${response.body.access_token}`)
    const testBlogs = helper.testBlogs
      .map(blog => new Blog(blog))
    const promiseArray = testBlogs.map(blog => {
      blog.user = createdUser.id
      blog.save()
    })
    await Promise.all(promiseArray)
  }
}, 10000)

describe('Get the correct amount of blogs with proper schema', () => {
  test('correct amount of blogs are returned', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then((response) => {
        expect(response.body).toHaveLength(helper.testBlogs.length)
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              user: expect.objectContaining({
                username: expect.any(String),
                name: expect.any(String)
              })
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
      .set('Authorization', authHeader)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('Unauthenticated POST results in status 401', async () => {
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  test('Number of blogs is increased by 1', async () => {
    // newBlog.user = createdUser.id
    await api.post('/api/blogs')
      .set('Authorization', authHeader)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .then(async () => {
        await api.get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
          .then(getResponse => {
            expect(getResponse.body).toHaveLength(helper.testBlogs.length + 1)
          })
      })
  }, 10000)

  test('Created blog matches the one sent', async () => {
    // newBlog.user = createdUser.id
    await api.post('/api/blogs')
      .set('Authorization', authHeader)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .then(response => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: response.body.id,
            author: newBlog.author,
            title: newBlog.title,
            url: newBlog.url,
            user: createdUser.id
          })
        )
      })
  }, 10000)

  test('If created blog is missing likes property, it will default to 0', async () => {
    delete newBlog.likes
    await api.post('/api/blogs')
      .set('Authorization', authHeader)
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
    await api.post('/api/blogs')
      .set('Authorization', authHeader)
      .send({
        author: newBlog.author,
        url: newBlog.url,
        // user: createdUser.id
      })
      .expect(400)
  }, 10000)

  test('If the blog to be created is missing url, return 400', async () => {
    await api.post('/api/blogs')
      .set('Authorization', authHeader)
      .send({
        author: newBlog.author,
        title: newBlog.title,
        // user: createdUser.id
      })
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
      .set('Authorization', authHeader)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .then(async response => {
        await api.delete(`/api/blogs/${response.body.id}`)
          .set('Authorization', authHeader)
          .expect(204)
      })
  }, 10000)

  test('Delete a blog with an id, but wrong user results in 403', async () => {
    await api.post('/api/blogs')
      .set('Authorization', authHeader)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .then(async response => {
        const pwHash = await bcrypt.hash(process.env.PW, 5)
        const user = new User({
          username: 'testuser2',
          name: 'User2, Test',
          pwHash: pwHash
        })
        createdUser = await user.save()
        if (createdUser) {
          authHeader = await api.post('/api/token')
            .send({
              username: createdUser.username,
              password: process.env.PW
            })
            .expect(200)
            .then(response =>
              authHeader = `Bearer ${response.body.access_token}`)
              await api.delete(`/api/blogs/${response.body.id}`)
              .set('Authorization', authHeader)
              .expect(403)
          }
        })
  }, 10000)

  test('Delete a blog with an invalid id returns 404', async () => {
    await api.delete('/api/blogs/64024a78c6c1840cdb3e39a3')
      .set('Authorization', authHeader)
      .expect(404)
  })

  test('Unauthenticated DELETE results int 401', async () => {
    await api.delete('/api/blogs/64024a78c6c1840cdb3e39a3')
      .expect(401)
  })

  test('Delete a blog without any id return 404', async () => {
    await api.delete('/api/blogs')
      .set('Authorization', authHeader)
      .expect(404)
  })
})

describe('Bump the number of likes', () => {
  const newBlog = {
    author: 'AuthorForUpdatingLikes',
    title: 'BlogForUpdateginLikes',
    url: 'https://localhostForUpdatingLikes'
  }

  test('Unauthenticated PUT results int 401', async () => {
    await api.put('/api/blogs/64024a78c6c1840cdb3e39a3')
      .send(newBlog)
      .expect(401)
  })

  test('Add one like to blog', async () => {
    newBlog.user = createdUser.id
    await api.post('/api/blogs/')
      .set('Authorization', authHeader)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .then(async response => {
        await api.put(`/api/blogs/${response.body.id}`)
          .set('Authorization', authHeader)
          .send({...newBlog, likes: 1})
          .expect(200)
          .expect('Content-Type', /application\/json/)
          .then(response => {
            expect(response.body).toEqual(
              expect.objectContaining(
                {...newBlog, likes: 1}
              )
            )
          })
      })
  })

  test('Add one like to blog with missing title results in 400', async () => {
    await api.post('/api/blogs/')
      .set('Authorization', authHeader)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .then(async response => {
        await api.put(`/api/blogs/${response.body.id}`)
          .set('Authorization', authHeader)
          .send({
            author: newBlog.author,
            url: newBlog.url,
            likes: 1,
            // user: createdUser.id
          })
          .expect(400)
          .expect('Content-Type', /application\/json/)
      })
  })

  test('Add one like to blog with missing author results in 400', async () => {
    await api.post('/api/blogs/')
      .set('Authorization', authHeader)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .then(async response => {
        await api.put(`/api/blogs/${response.body.id}`)
          .set('Authorization', authHeader)
          .send({
            title: newBlog.title,
            url: newBlog.url,
            likes: 1,
            // user: createdUser.id
          })
          .expect(400)
          .expect('Content-Type', /application\/json/)
      })
  })

  test('Add one like to blog with missing url results in 400', async () => {
    await api.post('/api/blogs/')
      .set('Authorization', authHeader)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .then(async response => {
        await api.put(`/api/blogs/${response.body.id}`)
          .set('Authorization', authHeader)
          .send({
            author: newBlog.author,
            title: newBlog.title,
            likes: 1,
            // user: createdUser.id
          })
          .expect(400)
          .expect('Content-Type', /application\/json/)
      })
  })

  test('Update a blog with an invalid id returns 404', async () => {
    await api.put('/api/blogs/64024a78c6c1840cdb3e39a3')
      .set('Authorization', authHeader)
      .send({
        author: newBlog.author,
        title: newBlog.title,
        url: newBlog.url,
        likes: 1,
        // user: createdUser.id
      })
      .expect(404)
  })

  test('Update a blog without any id return 404', async () => {
    await api.put('/api/blogs')
      .set('Authorization', authHeader)
      .expect(404)
  })
})
  
afterAll(async () => {
  await mongoose.connection.close()
})