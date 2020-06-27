import React from 'react'
import personsService from './../services/persons'

const NewEntryForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber }) => {
  const addEntry = (event) => {
    event.preventDefault()
    if (persons.some(person => person['name'] === newName)) {
      if (window.confirm(`${newName} already exists in the phonebook! Do you want to update the number?`)) {
        personsService
          .update(persons.find(p => p.name === newName).id, { name: newName, number: newNumber })
          .then(resp => setPersons([...persons.filter(p => p.name !== newName), resp]))
          .catch(err => console.log(err))
      }
    } else if (persons.some(person => person['number'] === newNumber)) {
      if (window.confirm(`Number ${newNumber} already exists in the phonebook! Do you want to update the owner?`)) {
        personsService
          .update(persons.find(p => p.number === newNumber).id, { name: newName, number: newNumber })
          .then(resp => setPersons([...persons.filter(p => p.number !== newNumber), resp]))
          .catch(err => console.log(err))
      }
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