import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div className="App">
      <h1>Countries</h1>
      <h3>search for country</h3>
      <input value={search} onChange={(event) => setSearch(event.target.value)} />
      <Countries search={search} countries={countries} setCountries={setCountries} />
    </div>
  );
}

export default App;
