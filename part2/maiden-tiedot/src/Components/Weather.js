import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
    const [ weather, setWeather ] = useState(null)
    const url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`
    useEffect(() => {
        axios.get(url).then((response) => {
            console.log(response)
            setWeather(response.data.current)
        })
    }, [url])
    if(weather) {
        return(
            <div>
                <h2>Weather in {country.capital}</h2>
                <p> Temperature: {weather.temperature} Celcius </p>
                <img src={weather.weather_icons[0]} alt={weather.weather_descriptions[0]} />
                <p> Wind: {weather.wind_speed} mph direction {weather.wind_dir} </p>
            </div>
        )
    } else {
        return (<></>)
    }

}

export default Weather
