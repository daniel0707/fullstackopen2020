
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription} from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'
import Recommendations from './components/Recommendations'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if ( token ) {
      setToken(token)
    }
  }, [])

  const updateCacheWith = (newBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)
    
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, newBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(newBook)}
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newBook = subscriptionData.data.bookAdded
      //window.alert(`New book available ! ${newBook.title}`)
      updateCacheWith(newBook)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ?
          <>
            <button onClick={()=> setPage('recommend')}>recommendations</button>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logout}>logout</button>
          </>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>
      <Authors show={page === 'authors'} setPage={setPage}/>
      <Books show={page === 'books'}/>
      <NewBook show={page === 'add'} setPage={setPage}/>
      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} />
      <Recommendations show={page === 'recommend'}/>
    </div>
  )
}

export default App