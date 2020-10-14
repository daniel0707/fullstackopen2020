const notificationReducer = (state = 'Test notification', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

const createNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATON',
    notification
  }
}

export default notificationReducer