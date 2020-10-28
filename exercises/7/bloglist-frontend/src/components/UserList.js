import React from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'

const UserList = () => {
  const users = useSelector(state => state.users)
  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th />
            <th><b>blogs created</b></th>
          </tr>
        </thead>
        <tbody>
          {_.orderBy(users, [(a => a.blogs.length)], ['desc'])
            .map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default UserList