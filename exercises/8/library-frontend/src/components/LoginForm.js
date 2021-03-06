import React, { useState, useEffect } from 'react'
import { useMutation, useLazyQuery } from '@apollo/client'
import { SELF } from '../queries'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setPage, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [findSelf, self] = useLazyQuery(SELF)

  const [ login,result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
    },
    onCompleted: ()=> { setPage('authors') }
  })

  useEffect(() => {
    if (result.data) {
      console.log("setting token")
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      findSelf()
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()
    login({
      variables: { username, password }
    })
  }
  if (!show) {
    return null
  }
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm