import React from 'react'
import { useSelector } from 'react-redux'
import { Alert, AlertIcon, Flex } from '@chakra-ui/core'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification.message === '') {
    return null
  }
  return (
    <Flex align="center" justify="center">
      <Alert status={notification.success ? 'success' : 'error'}>
        <AlertIcon />
        {notification.message}
      </Alert>
    </Flex>
  )
}
export default Notification