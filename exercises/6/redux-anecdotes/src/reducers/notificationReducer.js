const notificationReducer = (
  state = { 'content': '', 'timeoutId': null }, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return Object.assign({}, state, { 'content': action.content })
  case 'SET_TIMEOUT_ID':
    if (state.timeoutId) clearTimeout(state.timeoutId)
    return Object.assign({}, state, { 'timeoutId': action.timeoutId })
  default:
    return state
  }
}

export const createNotification = (content, timeout) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      content: content
    })
    const timeoutId = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        content: ''
      })
      dispatch({
        type: 'SET_TIMEOUT_ID',
        timeoutId: null
      })
    }, timeout)
    dispatch({
      type: 'SET_TIMEOUT_ID',
      timeoutId: timeoutId
    })
  }
}

export default notificationReducer