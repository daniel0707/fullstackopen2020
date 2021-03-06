import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const NextAnecdote = ({ amount, changeState }) => {
  const newAnecdote = () => changeState(Math.floor(Math.random() * amount))
  return (
    <>
      <button onClick={newAnecdote}>next anecdote</button>
    </>
  )
}

const Vote = ({ index, votes, setVotes }) => {
  const registerVote = () => {
    let tmp = [...votes]
    tmp[index] += 1
    setVotes(tmp)
  }
  return (
    <>
      <button onClick={registerVote}>vote</button>
    </>
  )
}

const MostPopular = ({ votes, anecdotes }) => {
  return (
    <div>
      <h2> Most Popular Anecdote</h2>
      <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
    </div>
  )

}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0, 0, props.anecdotes.length))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <Vote index={selected} votes={votes} setVotes={setVotes} />
      <NextAnecdote amount={props.anecdotes.length} changeState={setSelected} />
      <MostPopular votes={votes} anecdotes={props.anecdotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)