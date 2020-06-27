import React from 'react'
import personsService from './../services/persons'

const NewEntryForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber }) => {
  const addEntry = (event) => {
    event.preventDefault()
    if (persons.some(person => person['name'] === newName)) {
      window.alert(`${newName} already exists in the phonebook!`)
    } else if (persons.some(person => person['number'] === newNumber)) {
      window.alert(`Number ${newNumber} already exists in the phonebook!`)
    } else {
      personsService
        .create({ name: newName, number: newNumber })
        .then((resp) => setPersons([...persons, resp]))
        .catch(err => console.log(err))
    }
    setNewName('')
    setNewNumber('')
  }
  return (
    <form onSubmit={addEntry}>
      <div>
        name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
      </div>
      <div>
        number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default NewEntryForm