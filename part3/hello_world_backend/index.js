const express = require('express')
const app = express()

app.use(express.json())

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

app.get('/', (request, response) => {
    console.log(request)
    response.send('<h1>Hello Express World!</h1>')
})

app.get('/api/notes', (request, response) => {
    console.log(request)
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).send('Not found d[0.o]b')
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  notes = notes.filter(note => note.id !== id)

  if (note) {
  response.status(204).send(`Note with id ${id} deleted!`)
  } else {
    response.status(404).send('Not found d[0.o]b')
  }
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'No content? What to note then?' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }
  notes = notes.concat(note)

  console.log(note)
  
  response.json(note)
})

const PORT = 3010
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})