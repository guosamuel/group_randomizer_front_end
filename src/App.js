import React, { useState } from 'react';
import Form from './components/Form';
import GroupNumberInput from './components/GroupNumberInput';

function App() {
  const [ options, setOptions ] = useState(["Sam", "Ryan", "Stephen", "David"])
  const [ numberOfGroups, setNumberOfGroups ] = useState("1")
  const [ groupCards, setGroupCards ] = useState([])


  const handleOptionSubmit = (e, input) => {
    e.preventDefault()
    setOptions([...options, input])
  }

  const handleNumberOfGroups = e => {
    setNumberOfGroups(e.target.value)
  }

  function renderGroupCard(i) {
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
      squares.push(renderGroupCard(j))
    }

    setGroupCards(squares)
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
      <br />
      <br />
      {groupCards.length === 0 ? "Yet to be randomized" :
      <div
      style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexWrap: 'wrap'
        }}
        >
        {groupCards}
        </div>}
    </div>
  )
}

export default App;
