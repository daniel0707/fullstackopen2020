import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  } else {
    return null
  }
}
const mapStateToProps = (state) => {
  return {
    notification: state.notification.content,
  }
}

export default connect(mapStateToProps)(Notification)