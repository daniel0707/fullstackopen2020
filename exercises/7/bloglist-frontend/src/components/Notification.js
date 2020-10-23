import React from 'react'
import PropTypes from 'prop-types'

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
const Notification = ({ message, success }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error" style={success? notificationStyleSuccess : notificationStyleError}>
      {message}
    </div>
  )
}
Notification.propTypes = {
  message: PropTypes.string,
  success: PropTypes.bool
}
export default Notification