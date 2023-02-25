const express = require('express')
const app = express()

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
  console.log(request)
  response.json(phonebook)
})

const PORT = 3011
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})