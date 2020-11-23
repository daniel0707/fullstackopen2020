  
import React, { useEffect, useState } from 'react'
import { ALL_AUTHORS } from '../queries'
import { useQuery } from '@apollo/client'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    if (result.data) {
      setAuthors(result.data.allAuthors)
    }
  },[result])

  if (!props.show) {
    return null
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.books}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Authors
