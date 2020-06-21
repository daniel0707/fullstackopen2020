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

const Statistic = ({ name, count }) => {
  return (
    <>
      <p>{name} {count}</p>
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
      <Header line="good" />
      <Button counter={good} text="good" setter={setGood} />
      <Button counter={neutral} text="neutral" setter={setNeutral} />
      <Button counter={bad} text="bad" setter={setBad} />
      <Header line="statistics" />
      <Statistic name="good" count={good} />
      <Statistic name="neutral" count={neutral} />
      <Statistic name="bad" count={bad} />

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)