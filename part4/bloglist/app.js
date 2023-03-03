const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsApiRouter = require('./controllers/blogsApi')

mongoose.set('strictQuery', false)

const mongoUrl = config.mongoUrl
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsApiRouter)

module.exports = app