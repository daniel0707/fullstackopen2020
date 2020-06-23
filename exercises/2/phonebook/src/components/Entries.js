import React from 'react'
import Person from './Person'

const Entries = ({ persons, newSearch }) => {
    return (
        <ul>
            {persons.map((person) => {
                if (person.name.toLowerCase().includes(newSearch.toLowerCase())) {
                    return (<Person key={person.name} person={person} />)
                }
            })}
        </ul>
    )
}

export default Entries