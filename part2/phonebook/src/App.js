import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addNumber = (event) => {
    event.preventDefault()

    const personObject = {
      id: persons.length + 1,
      name: newName
    }

    if (persons.map(person =>
      person.name).indexOf(newName) !== -1) {
        alert(`${newName} is already added to phonebook and duplicates are not allowed!`);
    }
    else {
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input
                value={newName}
                onChange={handleNameChange}
                />
        </div>
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