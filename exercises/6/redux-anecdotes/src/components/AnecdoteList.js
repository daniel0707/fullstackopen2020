import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  return (
      _.orderBy(anecdotes, ['votes'], 'desc').map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => dispatch(voteAnecdote(anecdote.id))}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList