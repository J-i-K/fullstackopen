import { useState } from 'react'
import Person from './components/Person'
import Input from './components/Input'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number:'+358123456789' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addNumber = (event) => {
    event.preventDefault()

    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }

    if (personObject.name === '' || personObject.number === '') {
      alert(`Both the name and number has to be provided, current values for name or number are invalid!`)
    }
    else if (persons.map(person =>
      person.name).indexOf(newName) !== -1) {
        alert(`${newName} is already added to phonebook and duplicates are not allowed!`);
    }
    else if (persons.map(person =>
      person.number).indexOf(newNumber) !== -1) {
        alert(`${newNumber} is already added to phonebook and duplicates are not allowed!`);
    }
    else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')      
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <Input inputName={'name'} value={newName} onChange={handleNameChange} />
        <Input inputName={'number'} value={newNumber} onChange={handleNumberChange} />
        <div>
          <button type="submit">add</button>
        </div>
        {/* <div>debug: {newName}</div> */}
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <Person key={person.id} person={person} />
      )}
    </div>
  )
}

export default App