import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import _ from 'lodash'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const vote = (anecdote) => () => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(createNotification(`You voted on - ${anecdote.content}`))
    setTimeout(() => {
      dispatch(createNotification(''))
    }, 5000)
  }
  return (
    _.chain(anecdotes)
      .filter(a => { return filter ? _.includes(_.lowerCase(a.content), filter) : true })
      .orderBy(['votes'], 'desc')
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={vote(anecdote)}>vote</button>
          </div>
        </div>
      ).value()
  )
}

export default AnecdoteList