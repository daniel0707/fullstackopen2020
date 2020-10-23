import React from 'react'
import { useSelector } from 'react-redux'

const notificationStyleSuccess = {
  color: 'Green',
  background: 'LightGrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  margin: 10,
  borderColor: 'Green'
}

const notificationStyleError = {
  color: 'Red',
  background: 'LightGrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  margin: 10,
  borderColor: 'Red'
}
const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification.message === '') {
    return null
  }

  return (
    <div className="error" style={notification.success? notificationStyleSuccess : notificationStyleError}>
      {notification.message}
    </div>
  )
}
export default Notification