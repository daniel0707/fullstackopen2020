const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  default:
    return state
  }
}

export const createNotification = (notification, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: notification
    })
    await new Promise(resolve => setTimeout(() => {
      resolve(
        dispatch({
          type: 'SET_NOTIFICATION',
          notification: ''
        })
      )
    }, timeout
    ))
  }
}

export default notificationReducer