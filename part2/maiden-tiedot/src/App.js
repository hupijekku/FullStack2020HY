import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './Components/Countries'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ show, setShow ] = useState([])
  const [ state, setState ] = useState(0)

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      setCountries(res.data)
    }).catch((exception) =>  {
      throw exception
    })
  }, [])

  const onInputChange = (event) => {
    console.log(process.env.REACT_APP_API_KEY)
    let filter = countries.filter(country => {
      return country.name.toLowerCase().includes(event ? event.target.value.toLowerCase() : document.getElementById("input").value.toLowerCase())
    })
    let count = filter.length
    switch(true) {
      case (count > 10):
        setState(1)
        break
      case (count > 1 && count < 10):
        setShow(filter)
        setState(2)
        break
      case (count === 1):
        setShow(filter)
        setState(3)
        break
      default:
        setState(0)
        break
    }
  }

  return (
    <div>
      <p>Search: </p>
      <input id="input" onChange={onInputChange}/>

      <Countries state={state} show={show} onInputChange={onInputChange} />
    </div>
  )
}

export default App;
