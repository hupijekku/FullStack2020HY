import React, { useState, useEffect } from 'react'

import Filter from './Components/Filter'
import Notification from './Components/Notification'
import Persons from './Components/Persons'
import PersonForm from './Components/PersonForm'

import phbookService from './services/phbookService'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState({
    name: null,
    phone: null
  })
  const [ filter, setFilter ] = useState(null)
  const [ notification, setNotification ] = useState({
    message: null,
    success: false
  })

  useEffect(() => {
    phbookService.getAll().then((res) => {
      setPersons(res.data)
    }).catch((exception) => {
      throw exception
    })
  },[])

  const showNotification = (message, time, success) => {
    
    setNotification({
      message: message,
      success: success
    })
    console.log(notification)
    setTimeout(() => {
      setNotification({
        message: null,
        success: false
      })
    }, time * 1000)
  }

  const onNameChange = (event) => {
    setNewName({
      name: event.target.value,
      number: newName.number
    })
  }
  
  const onNumberChange = (event) => {
    setNewName({
      name: newName.name,
      number: event.target.value
    })
  }

  const onFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  const addNumber = (event) => {
    event.preventDefault()

    if(persons.filter(p => p.name === newName.name).length === 0) {
      phbookService.savePerson(newName).then((res) => {
        console.log(res)
        phbookService.getAll().then((res) => {
          setPersons(res.data)
          showNotification(`Added ${newName.name}`, 5, true)
        })
      })
    }
    else if(window.confirm("Name is already on the phonebook, replace the old number with the new one?")) {
      const id = persons.find((person) => person.name === newName.name).id
      phbookService.updatePerson(id,newName).then((res) => {
        let copy = [...persons]
        var i = persons.findIndex(p => p.id === id)
        copy[i] = newName
        copy[i].id = id
        setPersons(copy)
        showNotification(`Updated ${newName.name}`, 5, true)
      }).catch((exception) => {
        showNotification(`Update of ${newName.name} failed`, 5, false)
      })
    }
  }

  const removeNumber = (id) => {
    var i = persons.findIndex(p => p.id === id)
    var p = persons[i]
    if(window.confirm(`Delete ${p.name} ?`)) {
      phbookService.deletePerson(id).then((res) => {
        let copy = [...persons]
        copy.splice(i,1)
        showNotification(`${p.name} was successfully removed`, 5, true)
        setPersons(copy)
      }).catch((exception) => {
        showNotification(`${p.name} has already been removed.`, 5, false)
      })
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Notification notification={notification}/>

      <Filter onFilterChange={onFilterChange}/>

      <h2>Add a number</h2>
      <PersonForm onSubmit={addNumber} onNameChange={onNameChange} onNumberChange={onNumberChange} />

      <h2>Numbers</h2>
      
      <Persons persons={persons} filter={filter} removeNumber={removeNumber} />
      ...
    </div>
  )

}

export default App