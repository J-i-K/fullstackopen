const errorHandler = (error, request, response, next) => {
    // console.error(error.name)
    // console.log(error._message)
    // console.log(error.message)
  
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    if (error.name === 'ValidationError') {
        return response.status(400).send({error: error.message})
    }
  
    next(error)
}

module.exports = errorHandler