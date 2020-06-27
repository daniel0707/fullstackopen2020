import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Entries from './components/Entries'
import NewEntryForm from './components/NewEntryForm'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const deletePerson = (id) => {
    if (window.confirm(`Are you sure you want to delete ${persons.find((p) => p.id === id).name}`)) {
      personsService
        .remove(id)
        .then(setPersons(persons.filter(item => item.id !== id)))
        .catch(err => console.log(err))
    }

  }
  useEffect(() => {
    personsService
      .getAll()
      .then(resp => setPersons(resp))
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter newSearch={newSearch} setNewSearch={setNewSearch} />
      <h2>Add new entry</h2>
      <NewEntryForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Entries persons={persons} newSearch={newSearch} deletePerson={deletePerson} />
    </div>
  )
}

export default App