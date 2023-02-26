const { default: mongoose } = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.DB_uri

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB', result)
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Minimum required name length is 3, got {VALUE}'],
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: function formatValidator (number) {
        console.log('validating format')
        if (number.indexOf('-') !== -1) {
          return /\d{2,3}-\d+/.test(number)
        } else {return true}
      },
      message: props => `${props.value} is not of expected format, if there is a hyphen then first part must have between 2 and 3 numbers!`
    },
    minLength: [8, 'Expected length of number is 8!']
  }
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', contactSchema)