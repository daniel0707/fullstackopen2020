import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(createNotification('You created a note - ' + content))
    setTimeout(() => {
      dispatch(createNotification(''))
    }, 5000)
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