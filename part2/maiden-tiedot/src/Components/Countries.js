import React from 'react'

import Weather from './Weather'

const Countries = ({ state, show, onInputChange }) => {
  const showButton = (country) => {
      document.getElementById("input").value = country.name
      onInputChange()
  }

  switch(state) {
      case 0:
          return (<div><p>No matches found.</p></div>)
      case 1:
          return (<div><p>Too many matches, specify another filter</p></div>)
      case 2:
          const countries = show.map(country => {
              return (<li key={country.numericCode}>{country.name} <button onClick={(event) => showButton(country)}>Show</button></li>)
          })
          return (
              <div>
                  <ul>
                      {countries}
                  </ul>
              </div>
          )
      case 3:
          const languages = show[0].languages.map(lan => {
              return (<li key={lan.iso639_2}>{lan.name}</li>)
          })
          return (
              <div>
                  <h1>{show[0].name}</h1>
                  <ul>
                      <li>Capital {show[0].capital}</li>
                      <li>Population {show[0].population}</li>
                  </ul>
                  <h2>Spoken languages</h2>
                  <ul>
                      {languages}
                  </ul>
                  <img src={show[0].flag} width="300px" alt="Flag of the country"/>
                  <Weather country={show[0]} />
              </div>
          )
      default:
          return (<></>)
  }
}

export default Countries