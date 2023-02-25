const express = require('express')
const app = express()

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
  response.send(`The Phonebook has ${phonebook.length} contacts available<br /><br />Date and time:<br />${Date()}`)
})

app.get('/api/persons', (request, response) => {
  response.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const contact = phonebook.find(contact => contact.id === id)

  if (contact) {
    response.json(contact)
  } else {
    response.status(404).send('Contact not found d[0.o]b')
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const contact = phonebook.find(contact => contact.id === id)
  phonebook = phonebook.filter(contact => contact.id !== id)

  if (contact) {
  response.status(204).send(`Contact with id ${id} deleted!`)
  } else {
    response.status(404).send('Contact not found d[0.o]b')
  }
})

app.post('/api/persons', (request, response) => {
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

  const contact = {
    id: Math.round(Math.random() * 100000000000),
    name: body.name,
    number: body.number
  }
  phonebook = phonebook.concat(contact)
  
  response.status(201).json(contact)
})

const PORT = process.env.PORT || 3011
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})