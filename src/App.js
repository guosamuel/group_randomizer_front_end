import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import GroupNumberInput from './components/GroupNumberInput';

function App() {
  const [ options, setOptions ] = useState(["Sam", "Ryan", "Stephen", "David"])
  const [ numberOfGroups, setNumberOfGroups ] = useState("1")
  const [ groups, setGroups ] = useState([])
  const [ groupSize, setGroupSize ] = useState(1)
  const [ randomizedOption, setRandomizedOption ] = useState("")

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

  function renderGroupCard(i, currentNumberOfGroups, arrayOfOptions) {
    const listOfGroupOptions = arrayOfOptions.map( (option, index) => <li key={index}>{option}</li>)
    return (
      <div key={i+1} style={{width: '25%'}}>
        <h1>Group {i+1}</h1>
        <ul>{listOfGroupOptions}</ul>
      </div>
    )
  }

  const randomizeGroups = (number, choices) => {
    const copyOfOptions = [...options]
    const convertedToIntegerNumber = parseInt(number, 10)
    const squares = []
    const selectedOptions = []

    //set up the nested arrays for the selectedOptions
    for (let i = 0; i < convertedToIntegerNumber; i++) {
      selectedOptions.push([])
    }

    //loop for randomizing the options in each group
    let groupCount = 0
    while (copyOfOptions.length > 0) {
      let randomIndex = Math.floor(Math.random() * copyOfOptions.length)
      selectedOptions[groupCount].push(copyOfOptions[randomIndex])
      copyOfOptions.splice(randomIndex, 1)
      if (groupCount < convertedToIntegerNumber - 1) {
        groupCount += 1
      } else {
        groupCount = 0
      }
    }

    for (let j = 0; j < convertedToIntegerNumber; j++) {
      squares.push(renderGroupCard(j, number, selectedOptions[j]))
    }

    setGroups(squares)
  }

  const clearGroups = () => {
    setGroups([])
    setRandomizedOption("")
  }

  const randomOption = () => {
    setRandomizedOption(options[Math.floor(Math.random() * options.length)])
  }

  const removeOption = idx => {
    const updatedList = [options.slice(0, idx), options.slice(idx+1)]
    setOptions([...updatedList])
  }

  const listOfOptions = options.map( (option, index) => {
    return (
      <li
      key={index}
      onClick={ idx => removeOption(index)}
      >
        {option}
      </li>
    )
  })

  return (
    <div>
      <h1>Group Randomizer</h1>
      <Form handleOptionSubmit={handleOptionSubmit}/>
      <br/>
      <GroupNumberInput maxNumberOfGroups={options.length} handleNumberOfGroups={handleNumberOfGroups}/>
      <h2>Current List of Options</h2>
      <ol>{listOfOptions}</ol>
      <button onClick={(number, choices) => randomizeGroups(numberOfGroups, options)}>Randomize Into Groups!</button>
      <button onClick={clearGroups}>Clear</button>
      <button onClick={randomOption}>Randomly Select One Option</button>
      <br />
      <br />
      {groups.length === 0 && randomizedOption.length === 0 ?
      <div>
        <h2>Yet to be randomized</h2>
      </div> :
      randomizedOption.length === 0 ?
      <div
      style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexWrap: 'wrap'
        }}
        >
        {groups}
        </div> :
        <div>
          <h2>Your randomized choice is: {randomizedOption}</h2>
        </div>
      }
    </div>
  )
}

export default App;
