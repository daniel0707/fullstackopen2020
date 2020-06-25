import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
    let key = process.env.REACT_APP_WEATHER_API_KEY
    const [weather, setWeather] = useState('')
    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${key}&units=metric`)
            .then((response) => setWeather(response.data))
    }, [])
    if (weather !== '') {
        console.log(weather)
        return (
            <div>
                <b>Temperature: </b>{weather.main.temp} degrees Celsius
                <br />
                <b>Pressure: </b>{weather.main.pressure} hectopascals
                <br />
                <b>Humidity: </b>{weather.main.humidity}%
                <br />
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} />
            </div>

        )
    } else {
        return (
            <div>
                Loading...
            </div>
        )
    }
}
export default Weather