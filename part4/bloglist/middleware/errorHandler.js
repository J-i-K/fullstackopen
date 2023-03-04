const errorHandler = (error, request, response, next) => {
  let errorCode = 400
  if (error.name === 'CastError') {
    return response.status(errorCode).send({ error: error.message })
  }
  if (error.name === 'ValidationError') {
    if (error.errors.username.kind === 'unique') {
      errorCode = 409
    } else {
      errorCode = 400
    }
    return response.status(errorCode).send({error: error.message})
  }
  
  next(error)
}
  
module.exports = errorHandler