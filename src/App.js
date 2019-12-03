import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import GroupNumberInput from './components/GroupNumberInput';

function App() {
  const [ options, setOptions ] = useState(["Sam", "Ryan", "Stephen", "David"])
  const [ numberOfGroups, setNumberOfGroups ] = useState("1")
  const [ groups, setGroups ] = useState([])
  const [ groupSize, setGroupSize ] = useState(1)

  useEffect(() => {
    setGroupSize(Math.floor(options.length/parseInt(numberOfGroups, 10)))
  }, [options.length, numberOfGroups])


  const handleOptionSubmit = (e, input) => {
    e.preventDefault()
    setOptions([...options, input])
  }

  const handleNumberOfGroups = e => {
    setNumberOfGroups(e.target.value)
  }

  function renderGroupCard(i, currentNumberOfGroups) {
    // console.log("I AM IN THE RENDER GROUP CARD", options.length, groupSize)
    if (options.length > groupSize) {
      const selectedOptions = []
      const randomIndex = Math.floor(Math.random() * options.length)
    }
    return (
      <div key={i} style={{width: '25%'}}>
        <h1>Group {i}</h1>
      </div>
    )
  }

  const randomizeGroups = (number, choices) => {
    const convertedToIntegerNumber = parseInt(number, 10)
    const squares = []

    for (let j = 1; j < convertedToIntegerNumber + 1; j++) {
      squares.push(renderGroupCard(j, number))
    }

    setGroups(squares)
  }

  const clearGroups = () => {
    setGroups([])
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
      <button onClick={clearGroups}>Clear Groups</button>
      <br />
      <br />
      {groups.length === 0 ? "Yet to be randomized" :
      <div
      style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexWrap: 'wrap'
        }}
        >
        {groups}
        </div>}
    </div>
  )
}

export default App;
