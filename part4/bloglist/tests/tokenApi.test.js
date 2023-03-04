const mongoose = require('mongoose')
const supertest = require('supertest')
// const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
// const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

let createdUser

beforeEach(async () => {
  await User.deleteMany({})

  const pwHash = await bcrypt.hash(process.env.PW, 5)
    const user = new User({
      username: 'testuser',
      name: 'User, Test',
      pwHash: pwHash
    })
  createdUser = await user.save()
//   if (createdUser) {
//     const testBlogs = helper.testBlogs
//       .map(blog => new Blog(blog))
//     const promiseArray = testBlogs.map(blog => {
//       blog.user = createdUser.id
//       blog.save()
//     })
//     await Promise.all(promiseArray)
//   }
}, 10000)

describe('Token tests', () => {
  test('correct username and password', async () => {
    await api.post('/api/token')
      .send({
        username: createdUser.username,
        password: process.env.PW
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            access_token: expect.any(String)
          })
        )
      })
  }, 10000)

  test('incorrect username expect 401', async () => {
    await api.post('/api/token')
      .send({
        username: 'veryUnlikelyUsernameToBeExistingInTheDatabase',
        password: process.env.PW
      })
      .expect(401)
      .expect('Content-Type', /application\/json/)
      .expect(/invalid/)
  }, 10000)

  test('incorrect password expect 401', async () => {
    await api.post('/api/token')
      .send({
        username: createdUser.username,
        password: 'aaaaaaaaaaaaaabbbbbbbbbbbccccccccc'
      })
      .expect(401)
      .expect('Content-Type', /application\/json/)
      .expect(/invalid/)
  }, 10000)

  test('missing username expect 400', async () => {
    await api.post('/api/token')
      .send({
        password: process.env.PW
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect(/missing username or password/)
  }, 10000)

  test('missing password expect 400', async () => {
    await api.post('/api/token')
      .send({
        username: createdUser.username
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect(/missing username or password/)
  }, 10000)
})
  
afterAll(async () => {
  await mongoose.connection.close()
})