const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsApiRouter = require('./controllers/blogsApi')
const usersApiRouter = require('./controllers/usersApi')
const ErrorHandler = require('./middleware/errorHandler')

mongoose.set('strictQuery', false)

const mongoUrl = config.mongoUrl
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsApiRouter)
app.use('/api/users', usersApiRouter)

app.use(ErrorHandler)

module.exports = app