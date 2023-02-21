import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Input from './components/Input'
import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addNumber = (event) => {
    event.preventDefault()

    const personObject = {
      // id: persons.length + 1,
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
      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        console.log(response)
        if (response.status === 201) {
          setPersons(persons.concat(response.data))
        }
        else {
          console.log(`Error ${response.status} with storing person: ${response.statusText}`)
        }
      })
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

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person =>
      person.name.toLocaleLowerCase('fi').includes(filter.toLocaleLowerCase('fi')))

  return (
    <div>
      <h2>Phonebook</h2>
      <Input inputName={'filter'} value={filter} onChange={handleFilterChange} />
      <h2>Add new person to phonebook</h2>
      <form onSubmit={addNumber}>
        <Input inputName={'name'} value={newName} onChange={handleNameChange} />
        <Input inputName={'number'} value={newNumber} onChange={handleNumberChange} />
        <div>
          <button type="submit">add</button>
        </div>
        {/* <div>debug: {newName}</div> */}
      </form>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App