require('dotenv').config()
const express = require('express')
const app = express()
const Contact = require('./models/contact')
const ErrorHandler = require('./middleware/errorHandler')

const morgan = require('morgan')
morgan.token('postBody', (req) => JSON.stringify(req.body).toString())

app.use(express.json())

app.use(morgan('tiny', {
  skip: function (req, res) { return req.method === 'POST'}
}))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postBody', {
  skip: function(req, res) { return req.method !== 'POST'}
}))

const cors = require('cors')
const { default: mongoose } = require('mongoose')

app.use(cors())

let phonebook = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/info', (request, response) => {
  Contact.find({}).then(contacts => response.send(`The Phonebook has ${contacts.length} contacts available<br /><br />Date and time:<br />${Date()}`))
})

app.get('/api/persons', (request, response) => {
  Contact.find({}).then(contacts => {
    console.log(contacts)
    response.json(contacts)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Contact.findById(request.params.id).then(contact => {
    if (contact) {
      response.json(contact)
    } else {
      response.status(404).send('Contact not found d[0.o]b')
    }
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Contact.findByIdAndRemove(request.params.id).then(deletedContact => {
    console.log(deletedContact)
    if (deletedContact) {
      response.status(204).send(`Contact with id ${request.params.id} deleted!`)
    } else {
      response.status(404).send('Contact not found d[0.o]b')  
    }
  })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'Both name and number should be given to store a contact.' 
    })
  } if (phonebook.map(contact => contact.name).indexOf(body.name) !== -1) {
    return response.status(409).json({ 
      error: 'Contact with the same name exists in the phonebook.' 
    })
  }

  const contact = new Contact({
    name: body.name,
    number: body.number
  })
  contact.save().then(savedContact => {
    response.status(201).json(savedContact)
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'Both name and number should be given to store a contact.' 
    })
  } else {
    const contact = {
      name: body.name,
      number: body.number
    }
    Contact.findByIdAndUpdate(request.params.id, contact, {new: true, runValidators: true, context: 'query'})
    .then(updatedContact => response.json(updatedContact))
    .catch(error => next(error))
  }
})

app.use(ErrorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})