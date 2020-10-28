import React from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { Link } from 'react-router-dom'

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
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default UserList