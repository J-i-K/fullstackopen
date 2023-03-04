const usersApiRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersApiRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersApiRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (username && password && password.length >= 3) {
    const saltRounds = process.env.NODE_ENV === 'prd'
      ? 30
      : 5
    const pwHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
      username: username,
      name: name
        ? name
        : username,
      pwHash: pwHash
    })
    const createdUser = await user.save()
    if (createdUser) {
      response.status(201).json(createdUser)
    } else {
      response.status(400).json({
        error: 'Bad request'
      })
    }
  } else {
    response.status(400).json({
      error: 'Invalid username or password'
    })
  }
})

module.exports = usersApiRouter