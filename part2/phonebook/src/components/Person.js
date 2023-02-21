const Person = ({ person, removePerson }) => {
    return <p>{person.name}: {person.number} - <button onClick={removePerson}>remove</button></p>
}

export default Person