import { useState } from 'react'

const PPrinter = ({ text }) => {
  console.log("Printer")
  return (
  <p>{text}</p>
  )
}

const Printer = ({ text, value }) => {
  console.log("Printer")
  return (
    <li>{text}: {value}</li>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  console.log("Initializing")
  // save clicks of each button to its own state
  const header = "Please provide feedback with below buttons:"
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const footer = "Stats:"
  const setGoodValue = (newValue) => () => setGood(newValue)
  const setNeutralValue = (newValue) => () => setNeutral(newValue)
  const setBadValue = (newValue) => () => setBad(newValue)
  console.log("Initialized")

  return (
    <div>
      <PPrinter text={header} />
      <Button handleClick={setGoodValue(good + 1)} text="Good" />
      <Button handleClick={setNeutralValue(neutral + 1)} text="Neutral" />
      <Button handleClick={setBadValue(bad + 1)} text="Bad" />
      <PPrinter text={footer} />
      <Printer text={'Good'} value={good} />
      <Printer text={'Neutral'} value={neutral} />
      <Printer text={'Bad'} value={bad} />
      <Printer text={'All'} value={good + neutral +bad} />
      <Printer text={'Avg'} value={(good + neutral * 0 - bad)/(good + neutral +bad)} />
      <Printer text={'Positive %'} value={good/(good + neutral +bad)*100} />      
    </div>
  )
}

export default App;