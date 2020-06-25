import React from 'react'
import Country from './Country'

const Countries = ({ search, countries }) => {
    let filteredCountries = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
    if (filteredCountries.length > 10) {
        return (
            <div>
                <p>Too many matches, please be more specific</p>
            </div>
        )
    } else if (filteredCountries.length > 1) {
        return (
            <div>
                <ul>
                    {filteredCountries.map((country) => <li key={country.name}>{country.name}</li>)}
                </ul>
            </div>
        )
    } else if (filteredCountries.length > 0) {
        return (
            <div>
                <Country country={filteredCountries[0]} />
            </div>
        )
    } else {
        return (
            <div>
                <p>No country name matched the search term</p>
            </div>
        )
    }
}

export default Countries