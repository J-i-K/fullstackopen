import Person from './Person'
import phonebookService from '../services/Phonebook'

const removePerson = ( id, persons, setPersons ) => {
    console.log(persons)
    window.confirm(`Are you sure you wish to remove ${persons.find(person => person.id === id).name} from the phonebook?`)
    console.log(`Deleting person ${id}`)
    phonebookService
      .remove(id)
      .then(response => {
        // console.log(response)
        // console.log(persons)
        if (response.status === 200) {
        //   setPersons(persons.filter(person => person.id !== id))
          setPersons(persons.filter(person => person.id !== id))
        }
        else {
          console.log(`Error ${response.status} with deleting person: ${response.statusText}`)
        }
      })
}

const Persons = ({ persons, setPersons }) => {
    return (
        <div>
            <h2>Numbers</h2>
            {persons.map(person => 
            <Person key={person.id} person={person} removePerson={() => removePerson(person.id, persons, setPersons)}/>
            )}
        </div>
    )
}

export default ( Persons )