const User = require('../models/user')
const jwt = require('jsonwebtoken')

const tokenExtractor = async (request, response, next) => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    const decodedToken = jwt.verify(authorization.replace('Bearer ', ''), process.env.SECRET)
    request.token = decodedToken
    request.user = await User.findById(decodedToken.id)
  }
  next()
}

module.exports = tokenExtractor