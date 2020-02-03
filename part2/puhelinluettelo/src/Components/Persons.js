import React from 'react'

const Persons = ({ persons, filter, removeNumber }) => {
    console.log(persons)
    let output = [...persons]
    if(filter) {
        output = output.filter((person) => {
            return person.name.toLowerCase().includes(filter)
        })
    }
    const rows = output.map(person => {
        return <li key={person.id}>{person.name} {person.number} <button onClick={() => removeNumber(person.id)}>Remove</button></li>
    })
    return (
        <ul>
            {rows}
        </ul>
    )
}

export default Persons