import Person from './Person'
import phonebookService from '../services/Phonebook'

const removePerson = ( id, persons, setPersons, setNotificationMessage, setNotificationStyle ) => {
    console.log(persons)
    window.confirm(`Are you sure you wish to remove ${persons.find(person => person.id === id).name} from the phonebook?`)
    console.log(`Deleting person ${id}`)
    phonebookService
      .remove(id)
      .then(response => {
        console.log(`Deletion response: ${response}`)
        if (response.status === 204) {
          setPersons(persons.filter(person => person.id !== id))
        }
      })
      .catch(error => {
        // console.log(error)
        if (error.response.status === 404) {
            console.log(`deletion 404 caught for id ${id}`)
            setNotificationMessage(
                `Weird, looks like person ${persons.find(person => person.id === id).name} was already missing d{0_o}b, let's fix that!`
            )
            setNotificationStyle('error')
            setTimeout(() => {
            setNotificationMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== id))
        }
      })
}

const Persons = ({ persons, setPersons, setNotificationMessage, setNotificationStyle }) => {
    return (
        <div>
            <h2>Numbers</h2>
            {persons.map(person => 
            <Person key={person.id} person={person} removePerson={() => removePerson(person.id, persons, setPersons, setNotificationMessage, setNotificationStyle)}/>
            )}
        </div>
    )
}

export default ( Persons )