import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import _ from 'lodash'

const AnecdoteList = (props) => {
/*   const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter) */
  const vote = (anecdote) => () => {
    props.voteAnecdote(anecdote)
    props.createNotification(`You voted on - ${anecdote.content}`,5000)
  }
  return (
    _.chain(props.anecdotes)
      .filter(a => { return props.filter ? _.includes(_.lowerCase(a.content), props.filter) : true })
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
const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}
const mapDispatchToProps = {
  createNotification,
  voteAnecdote
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)


export default ConnectedAnecdoteList