import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    dispatch(createAnecdote(content))
  }
  
  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input name="newAnecdote" />
      </div>
      <button type="submit">create</button>
      </form>
  )
}

export default AnecdoteForm