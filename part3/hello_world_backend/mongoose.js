const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb://jik-fullstackopen-mongodb:${password}@jik-fullstackopen-mongodb.mongo.cosmos.azure.com:10255/noteApp?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@jik-fullstackopen-mongodb@`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is Easy',
  important: true,
})

Note.find({ important: false }).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })