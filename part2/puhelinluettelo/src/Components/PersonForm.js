import React from 'react'

const PersonForm = ({onSubmit, onNameChange, onNumberChange}) => {
    return (
        <form onSubmit={onSubmit}>
            <div> Name: <input onChange={onNameChange}/> </div>
            <div> Number: <input onChange={onNumberChange}/> </div>
            <button type="submit">Add</button>
        </form>
    )
}

export default PersonForm