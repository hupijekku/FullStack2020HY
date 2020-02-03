import React from 'react'

const Filter = ({ onFilterChange }) => {
    return (
        <div>
            <p>Filter: </p>
            <input onChange={onFilterChange}/>
        </div>
    )
}

export default Filter