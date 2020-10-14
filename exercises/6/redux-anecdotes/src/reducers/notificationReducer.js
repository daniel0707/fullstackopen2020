const notificationReducer = (state = 'Test notification', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const createNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification: notification
  }
}

export default notificationReducer