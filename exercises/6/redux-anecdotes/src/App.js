import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, createAnecdote } from './reducers/anecdoteReducer'
import _ from 'lodash'
import AnecdoteForm from './components/AnecdoteForm'
const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()



  return (
    <div>
      <h2>Anecdotes</h2>
      {_.orderBy(anecdotes,['votes'],'desc').map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(voteAnecdote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
        <AnecdoteForm />
    </div>
  )
}

export default App