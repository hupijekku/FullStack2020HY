import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, handleClick }) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    const all = good+neutral+bad
    if(all === 0) {
        return (
            <div>
                <h1>Statistics</h1>
                <p>No feedback given</p>
            </div>
        )
    }
    return (
        <div>
            <h1>Statistics</h1>
            <table>
                <tbody>
                    <StatisticLine text="Good" value={good}/>
                    <StatisticLine text="Neutral" value={neutral}/>
                    <StatisticLine text="Bad" value={bad}/>
                    <StatisticLine text="All" value={all}/>
                    <StatisticLine text="Average" value={(good-bad)/all}/>
                    <StatisticLine text="Positive" value={`${(good/all)*100} %`}/>
                </tbody>
            </table>
        </div>
    )
}

const StatisticLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incGood = () => setGood(good+1)
  const incNeutral = () => setNeutral(neutral+1)
  const incBad = () => setBad(bad+1)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="Good" handleClick={incGood} />
      <Button text="Neutral" handleClick={incNeutral} />
      <Button text="Bad" handleClick={incBad} />

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)