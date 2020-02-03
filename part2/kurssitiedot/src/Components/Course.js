import React from 'react'

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Content = ({ part }) => {
    const rows = part.map((part) => {
        return <Part key={part.id} name={part.name} exercises={part.exercises} />
    })

    return (<div>{rows}</div>)
}

const Total = ({ part }) => {
    const total = part.reduce((count, current) => {
        return count + current.exercises
    },0)
    return (
        <p>Number of exercises {total}</p>
    )
}

const Part = (props) => {
    return(<p>{props.name} {props.exercises}</p>)
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name}/>
            <Content part={course.parts}/>
            <Total part={course.parts}/>
        </div>
    )

}

export default Course