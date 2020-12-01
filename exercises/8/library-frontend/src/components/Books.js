import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import _ from 'lodash'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [filterQuery, lazyResult] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  
  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
      setGenres(_.chain(result.data.allBooks)
        .reduce((acc, b) => acc.concat(...b.genres), [])
        .uniq()
        .value())
    }
  }, [result])

  useEffect(() => {
    if (lazyResult.data) {
      setBooks(lazyResult.data.allBooks)
    }
  }, [lazyResult])
  


  const bookFilter = (filter) => () => {
    filterQuery({variables: {genre: filter}})
  } 
  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
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
      <div>
        <button active={result.data} onClick={()=>setBooks(result.data.allBooks)}>reset filter</button>
      </div>
      <div>
        Filter by genre:
        {genres.map(g => <button onClick={bookFilter(g)} key={g}>{g}</button>)}
      </div>
    </div>
  )
}

export default Books