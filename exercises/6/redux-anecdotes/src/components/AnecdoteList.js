import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import _ from 'lodash'

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const vote = (anecdote)=>() => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(createNotification(`You voted on - ${anecdote.content}`))
    setTimeout(dispatch(createNotification(''),5000))
  }
  return (
      _.orderBy(anecdotes, ['votes'], 'desc').map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
            <button onClick={vote(anecdote)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList