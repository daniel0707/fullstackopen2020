import React from 'react'
import Weather from './Weather'

const Country = ({ country }) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <p>
                <>Capital {country.capital}</>
                <br />
                <>Population {country.population}</>
            </p>
            <h3>Languages</h3>
            <ul>
                {country.languages.map((language) => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={country.flag} width='200px' alt='Graphic shows the flag of {{country.name}}' />
            <h3>Weather conditions at {country.capital}</h3>
            <Weather capital={country.capital} />
        </div>
    )
}

export default Country