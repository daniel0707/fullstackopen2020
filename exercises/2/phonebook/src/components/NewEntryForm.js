import React from 'react'
import personsService from './../services/persons'

const NewEntryForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber, setMessage, setMessageStatus }) => {
  const notify = (text, success) => () => {
    setMessageStatus(success)
    setMessage(text)
    setTimeout(() => {
      setMessage(null)
    }, 30000)
  }
  const addEntry = (event) => {
    event.preventDefault()
    if (persons.some(person => person['name'] === newName)) {
      if (window.confirm(`${newName} already exists in the phonebook! Do you want to update the number?`)) {
        personsService
          .update(persons.find(p => p.name === newName).id, { name: newName, number: newNumber })
          .then(resp => setPersons([...persons.filter(p => p.name !== newName), resp]))
          .then(notify(`Updated number of ${newName}`, true))
          .catch(err => {
            notify(`Failed to update ${newName} with reason: ${err.message}`, false)()
            console.log(err)
          })
      }
    } else if (persons.some(person => person['number'] === newNumber)) {
      if (window.confirm(`Number ${newNumber} already exists in the phonebook! Do you want to update the owner?`)) {
        personsService
          .update(persons.find(p => p.number === newNumber).id, { name: newName, number: newNumber })
          .then(resp => setPersons([...persons.filter(p => p.number !== newNumber), resp]))
          .then(notify(`Updated number owner for ${newNumber}`, true))
          .catch(err => {
            notify(`Failed to update owner of ${newNumber} with reason: ${err.message}`, false)()
            console.log(err)
          })
      }
    } else {
      personsService
        .create({ name: newName, number: newNumber })
        .then((resp) => setPersons([...persons, resp]))
        .then(notify(`Added ${newName}`, true))
        .catch(err => {
          notify(`Failed to save ${newName} with reason: ${err.message}`, false)()
          console.log(err)
        })
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