import React from 'react'
import Person from './Person'

const Entries = ({ persons, newSearch, deletePerson }) => {
    return (
        <ul>
            {persons.map((person) => {
                if (person.name.toLowerCase().includes(newSearch.toLowerCase())) {
                    return (<Person key={person.name} person={person} deletePerson={deletePerson}/>)
                } else { return null }
            })}
        </ul>
    )
}

export default Entries