import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Entries from './components/Entries'
import NewEntryForm from './components/NewEntryForm'
import personsService from './services/persons'
import Notification from './components/Notification'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [messageStatus, setMessageStatus] = useState(null)

  const notify = (text, state) => () => {
    setMessageStatus(state)
    setMessage(text)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const deletePerson = (id) => {
    let personToDelete = persons.find((p) => p.id === id).name
    if (window.confirm(`Are you sure you want to delete ${personToDelete}`)) {
      personsService
        .remove(id)
        .then(setPersons(persons.filter(item => item.id !== id)))
        .then(notify(`Deleted ${personToDelete}`, true))
        .catch(err => {
          notify(`Failed to delete ${personToDelete} with reason: ${err.message}`, false)()
          console.log(err)
        })
    }

  }
  useEffect(() => {
    personsService
      .getAll()
      .then(resp => setPersons(resp))
      .catch(err => {
        notify(`Failed to fetch phonebook from backend, with reason: ${err.message}`, false)()
        console.log(err)
      })
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} success={messageStatus} />
      <Filter newSearch={newSearch} setNewSearch={setNewSearch} />
      <h2>Add new entry</h2>
      <NewEntryForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setMessage={setMessage}
        setMessageStatus={setMessageStatus}
      />
      <h2>Numbers</h2>
      <Entries persons={persons} newSearch={newSearch} deletePerson={deletePerson} />
    </div>
  )
}

export default App