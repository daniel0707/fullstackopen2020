import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Entries from './components/Entries'
import NewEntryForm from './components/NewEntryForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter newSearch={newSearch} setNewSearch={setNewSearch} />
      <h2>Add new entry</h2>
      <NewEntryForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Entries persons={persons} newSearch={newSearch} />
    </div>
  )
}

export default App