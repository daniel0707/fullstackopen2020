import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, SELF } from '../queries'

const Recommendations = (props) => {
  const [filterQuery, lazyResult] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const [selfQuery, self] = useLazyQuery(SELF)
  const [filter, setFilter] = useState(null)

  useEffect(() => {
    if (props.show) {
      selfQuery()
    }
  },[props.show, selfQuery])

  useEffect(() => {
    if (self.data) {
      setFilter(self.data.me.favoriteGenre)
    }
  }, [self])
  
  useEffect(() => {
    if (filter) {
      filterQuery({ variables: { genre: filter } })
    }
  }, [filterQuery, filter])
  
  useEffect(() => {
    if (lazyResult.data) {
      setBooks(lazyResult.data.allBooks)
    }
  }, [lazyResult])

  if (!props.show) {
    return null
  }
  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <b>{filter}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations