import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(createNotification("You created a note - " + content))
    setTimeout(dispatch(createNotification(''),5000))
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