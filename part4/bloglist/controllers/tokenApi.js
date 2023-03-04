const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const tokenApiRouter = require('express').Router()
const User = require('../models/user')

tokenApiRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  if (username && password) {
    const user = await User.findOne({username})
    const correctPW = user === null
      ? false
      : await bcrypt.compare(password, user.pwHash)

    if (!(user && correctPW)) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    const token = jwt.sign(
      userForToken,
      process.env.SECRET,
      {expiresIn: 60*15}
    )

    response
      .status(200)
      .send({
        access_token: token})
  } else {
    response.status(400).json({
      error: 'missing username or password'
    })
  }
})

module.exports = tokenApiRouter