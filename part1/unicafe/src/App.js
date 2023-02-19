import { useState } from 'react'

const Printer = ({ text }) => {
  console.log("Printer")
  return (
  <p>{text}</p>
  )
}

const StatisticLine = ({ text, value, tailing }) => {
  return (
    <tr><td>{text}</td><td>{value}</td><td>{tailing}</td></tr>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({good, neutral, bad, footer}) => {
  if (good > 0 || neutral > 0 || bad > 0)
  return (
    <div>
      <Printer text={footer} />
      <table>
      <StatisticLine text={'Good'} value={good} />
      <StatisticLine text={'Neutral'} value={neutral} />
      <StatisticLine text={'Bad'} value={bad} />
      <StatisticLine text={'All'} value={good + neutral +bad} />
      <StatisticLine text={'Avg'} value={Math.round((good + neutral * 0 - bad)/(good + neutral +bad) * 100) / 100} />
      <StatisticLine text={'Positive'} value={Math.round(good/(good + neutral +bad) * 1000) / 10} tailing={'%'}/>
      </table>
    </div>
  )
  else
  return (
    <div>
      <Printer text={'No feedback given :\'('} />
    </div>
  )
}

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
      <Printer text={header} />
      <Button handleClick={setGoodValue(good + 1)} text="Good" />
      <Button handleClick={setNeutralValue(neutral + 1)} text="Neutral" />
      <Button handleClick={setBadValue(bad + 1)} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} footer={footer} />
    </div>
  )
}

export default App;