import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const BirthForm = ({authors}) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: ()=>[{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error)
    }
  })
  
  const submit = (event) => {
    event.preventDefault()
    editAuthor({ variables: { name, setBornTo: born } })
    setName('')
    setBorn('')
  }
  return (
    <div>
      <h3>Set birth year</h3>
      <form onSubmit={submit}>
        <label>
          Name:
          <select value={name} 
            onChange={({ target }) => setName(target.value)}>
            {authors.map((a)=>
              <option value={a.name} key={a.id}>{a.name}</option>
            )}
          </select>
        </label><br/>
        <label>
          Born:
           <input value={born}
            onChange={({target})=>setBorn(Number(target.value))}/>
        </label><br/>
        <button type='submit'>Set!</button>
      </form>
    </div>
  )
}

export default BirthForm