import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ line }) => {
  return (
    <div>
      <h1>{line}</h1>
    </div>
  )
}

const Button = ({ counter, text, setter }) => {
  return (
    <>
      <button onClick={() => setter(counter + 1)}>{text}</button>
    </>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good || neutral || bad) {
    let total = bad + neutral + good
    let average = (good - bad) / (bad + neutral + good)
    let positive = 100 * good / total
    return (
      <div>
        <table>
          <tbody>
            <Statistic name="good" value={good} />
            <Statistic name="neutral" value={neutral} />
            <Statistic name="bad" value={bad} />
            <Statistic name="all" value={total} />
            <Statistic name="average" value={average} />
            <Statistic name="positive" value={`${positive}%`} />
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

}
const Statistic = ({ name, value }) => {
  return (
    <>
      <tr>
        <th>{name}</th>
        <th>{value}</th>
      </tr>
    </>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header line="give feedback" />
      <Button counter={good} text="good" setter={setGood} />
      <Button counter={neutral} text="neutral" setter={setNeutral} />
      <Button counter={bad} text="bad" setter={setBad} />
      <Header line="statistics" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)