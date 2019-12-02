import React, { useState } from 'react';
import Form from './components/Form';
import GroupNumberInput from './components/GroupNumberInput'

function App() {
  const [ options, setOptions ] = useState(["Sam", "Ryan", "Stephen", "David"])
  const [ numberOfGroups, setNumberOfGroups ] = useState("1")

  const handleOptionSubmit = (e, input) => {
    e.preventDefault()
    setOptions([...options, input])
  }

  const handleNumberOfGroups = e => {
    setNumberOfGroups(e.target.value)
  }

  const randomizeGroups = (number, choices) => {
    const convertedToIntegerNumber = parseInt(number, 10)
    console.log(convertedToIntegerNumber, choices)
  }

  const listOfOptions = options.map( (option, index) => <li key={index}>{option}</li>)

  return (
    <div>
      <h1>Group Randomizer</h1>
      <Form handleOptionSubmit={handleOptionSubmit}/>
      <br/>
      <GroupNumberInput maxNumberOfGroups={options.length} handleNumberOfGroups={handleNumberOfGroups}/>
      <h2>Current List of Options</h2>
      <ol>{listOfOptions}</ol>
      <button onClick={(number, choices) => randomizeGroups(numberOfGroups, options)}>Randomize Into Groups!</button>
    </div>
  )
}

export default App;
