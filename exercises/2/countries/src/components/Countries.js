import React, { useState, useEffect } from 'react'
import Country from './Country'

const Countries = ({ search, countries }) => {

    const [showDetails, setShowDetails] = useState({})
    const [buttonText, setButtonText] = useState({})

    useEffect(() => {
        let initDetails = countries.reduce((accumulator, country) => {
            accumulator[country.name] = false
            return accumulator
        }, {})
        let initButtonText = countries.reduce((accumulator, country) => {
            accumulator[country.name] = 'Show details'
            return accumulator
        }, {})
        setShowDetails(initDetails)
        setButtonText(initButtonText)
    }, [countries])

    const clickHandler = (countryName) => () => {
        let details = { ...showDetails }
        details[countryName] = !details[countryName]
        setShowDetails(details)
        let tempTexts = { ...buttonText }
        details[countryName] ? tempTexts[countryName] = 'Hide details' : tempTexts[countryName] = 'Show details'
        setButtonText(tempTexts)
    }

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
                    {filteredCountries.map((country) => {
                        return (
                            <li key={country.name}>
                                {country.name}
                                <button onClick={clickHandler(country.name)}>
                                    {buttonText[country.name]}
                                </button>
                                {showDetails[country.name] ? <Country country={country} /> : null}
                            </li>
                        )
                    }
                    )}
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