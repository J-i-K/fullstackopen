import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

function getIntegerBelow(int) {
  return Math.floor(Math.random() * int);
}

function numberOfVotes(votes, key) {
  let numVotes = 0
  try {
    numVotes = Number(votes[key])
  }
  catch(error){
    console.log(error)
  }
  if (isNaN(numVotes)){
    return 0;
  }
  else {
    return numVotes;
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const setAnecdoteValue = (newValue) => () => {
    console.log('ArrayLength:', anecdotes.length, ' and selected value:', newValue)
    setSelected(newValue)
  }

  const [votes, setVotes] = useState({})
  let selectionVotes = numberOfVotes(votes, selected)
  const handleVote = () => {
    console.log('In handleVote')
    const newVotes = {
      ...votes,
      [selected]: selectionVotes += 1
    }
    setVotes(newVotes)
  }

  return (
    <div>
      {anecdotes[selected]}
      <br />has {numberOfVotes(votes, selected)} votes<br />
      <Button handleClick={setAnecdoteValue(getIntegerBelow(anecdotes.length))} text="Get another random Anecdote" />
      <Button handleClick={handleVote} text="+1 this anecdote" />
    </div>
  )
}

export default App