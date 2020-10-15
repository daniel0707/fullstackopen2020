const reducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_ANECDOTE':
    return [...state, action.data]
  case 'INIT_ANECDOTES':
    return action.data
  case 'VOTE_ANECDOTE': {
    const id = action.data.id
    const anecdoteToChange = state.find(a => a.id === id)
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }
    return state.map(a => a.id !== id ? a : changedAnecdote)
  }
  default:
    return state
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      ...anecdote
    }
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE_ANECDOTE',
    data: { id }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export default reducer