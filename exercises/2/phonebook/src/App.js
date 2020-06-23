import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '555-55-55' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const addEntry = (event) => {
    event.preventDefault()
    if (persons.some(person => person['name'] === newName)) {
      window.alert(`${newName} already exists in the phonebook!`)
    } else if (persons.some(person => person['number'] === newNumber)) {
      window.alert(`Number ${newNumber} already exists in the phonebook!`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
    }
    setNewName('')
    setNewNumber('')
  }
  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      <ul>
        {persons.map((val) => <li key={val.name}>{val.name} {val.number}</li>)}
      </ul>
    </div>
  )
}

export default App