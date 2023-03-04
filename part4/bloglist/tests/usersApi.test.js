// const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

//   const testBlogs = helper.testBlogs
//     .map(blog => new Blog(blog))
//   const promiseArray = testBlogs.map(blog => blog.save())
//   await Promise.all(promiseArray)
})

describe('getAllUsers', () => {
  test('There are no users, so length 0 expected', async () => {
    await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then((response) => {
        expect(response.body).toHaveLength(0)
      })
  }, 10000)
})

describe('User creation', () => {
  const newUser = {
    username: 'testuser',
    name: 'User, Test',
    password: 'Very-Secret-Password-For-Testing: Do Not Reveal!'
  }
  test('Create a user', async () => {
    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  }, 10000)

  test('Create a duplicate user fails', async () => {
    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .then(async () => {
        await api.post('/api/users')
          .send(newUser)
          .expect(409)
          .expect(/`username` to be unique/)
      })
  }, 10000)

  test('Create a user with too short username returns 400', async () => {
    await api.post('/api/users')
      .send({
        username: 'a',
        name: newUser.name,
        password: newUser.password
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
  }, 10000)

  test('Create a user with a very weak password returns 400', async () => {
    await api.post('/api/users')
      .send({
        username: newUser.username,
        name: newUser.name,
        password: 'pw'
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
  }, 10000)

  test('After user creation, there is a user', async () => {
    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .then(async () => {
        await api.get('/api/users')
          .expect(200)
          .expect('Content-Type', /application\/json/)
          .then(getResponse => {
            expect(getResponse.body).toHaveLength(1)
          })
      })
  }, 10000)
    
  test('Created user matches the one sent', async () => {
    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .then(response => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: response.body.id,
            username: newUser.username,
            name: newUser.name
          })
        )
      })
  }, 10000)

  test('If the user has not entered username, return 400', async () => {
    await api.post('/api/users')
      .send({
        name: newUser.name,
        password: newUser.password
      })
      .expect(400)
  }, 10000)

  test('If the user has not entered name, default to username', async () => {
    await api.post('/api/users')
      .send({
        username: newUser.username,
        password: newUser.password
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .then(response => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: response.body.id,
            username: newUser.username,
            name: newUser.username
          })
        )
      })
  }, 10000)
})