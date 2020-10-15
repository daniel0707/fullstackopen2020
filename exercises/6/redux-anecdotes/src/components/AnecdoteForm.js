import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
/*   const dispatch = useDispatch()*/

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    props.createAnecdote(content)
    props.createNotification('You created a note - ' + content,5000)
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

export default connect(null, { createNotification, createAnecdote })(AnecdoteForm)