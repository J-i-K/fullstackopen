require('dotenv').config()

const PORT = process.env.PORT
const mongoUrl = process.env.NODE_ENV === 'tst'
  ? process.env.mongoUrlTest
  : process.env.mongoUrl

module.exports = {
  mongoUrl,
  PORT
}