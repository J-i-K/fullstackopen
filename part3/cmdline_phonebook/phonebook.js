const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb://jik-fullstackopen-mongodb:${password}@jik-fullstackopen-mongodb.mongo.cosmos.azure.com:10255/phonebook?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@jik-fullstackopen-mongodb@`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Contact = mongoose.model('Contact', contactSchema)

if (name && number) {
    const contact = new Contact({
    name: process.argv[3],
    number: process.argv[4]
    })

    contact.save().then(result => {
        console.log(`contact saved! ${result}`)
        mongoose.connection.close()
    })
} else if (name || number) {
    console.log('Both name and number are required')
} else if (!name && !number) {
    Contact.find({}).then(result => {
        console.log('Phonebook:')
        result.forEach(contact => {
            console.log(`${contact.name} ${contact.number}`)
        })
        mongoose.connection.close()
    })
}