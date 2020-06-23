import React, { useState } from 'react'
import Filter from './components/Filter'
import Entries from './components/Entries'
import NewEntryForm from './components/NewEntryForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '555-55-55' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

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