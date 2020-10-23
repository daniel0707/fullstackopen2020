const notificationReducer = (
  state = { 'message': '', 'success':true, 'timeoutId': null }, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return Object.assign({}, state, { 'message': action.message, 'success':action.success })
  case 'SET_TIMEOUT_ID':
    if (state.timeoutId) clearTimeout(state.timeoutId)
    return Object.assign({}, state, { 'timeoutId': action.timeoutId })
  default:
    return state
  }
}

export const createNotification = (message, success, timeout=3000) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message: message,
      success: success
    })
    const timeoutId = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        message: '',
        success: true
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