import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import GroupNumberInput from './components/GroupNumberInput';

function App() {
  const [ options, setOptions ] = useState(["Sam", "Ryan", "Stephen", "David"])
  const [ numberOfGroups, setNumberOfGroups ] = useState("1")
  const [ groups, setGroups ] = useState([])
  const [ groupSize, setGroupSize ] = useState(1)
  const [ randomizedOption, setRandomizedOption ] = useState("")
  const [ savedGroups, setSavedGroups ] = useState([])

  useEffect(() => {
    //this is when a person deletes options, the maxNumberOfGroups should reflect the max length of the options
    if (options.length < parseInt(numberOfGroups, 10)) {
      if (options.length === 0) {
        setNumberOfGroups((options.length + 1).toString())
      } else {
      setNumberOfGroups(options.length.toString())
      }
    }
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

  const clearGroupsAndRandomizedOption = () => {
    setGroups([])
    setRandomizedOption("")
  }

  const clearOptions = () => {
    setOptions([])
  }

  const randomOption = () => {
    setRandomizedOption(options[Math.floor(Math.random() * options.length)])
  }

  const removeOption = idx => {
    const updatedList = [...options.slice(0, idx), ...options.slice(idx+1)]
    setOptions([...updatedList])
  }

  const listOfOptions = options.map( (option, index) => {
    return (
      <li key={index}>
        {option}
        <button onClick={ idx => removeOption(index)}>X</button>
      </li>
    )
  })

  const listOfSavedGroups = savedGroups.map( (savedGroup, index) => {
    return (
      <li key={index}>
        <h3>Saved Group #{index}</h3>
        <ul>
        {savedGroup.map( (savedOption, idx) => {
          return (
            <li key={index.idx}>
              {savedOption}
            </li>
          )
        })}
        </ul>
      </li>
    )
  })

  const handleSaveGroups = () => {
    setSavedGroups([...savedGroups, options])
  }

  return (
    <div>
      <h1>Group Randomizer</h1>
      <Form handleOptionSubmit={handleOptionSubmit}/>
      <br/>
      <h2>Saved Groups</h2>
      {!!savedGroups ? <p>You have yet to save any groups</p> :
        listOfSavedGroups
      }
      <br/>
      <GroupNumberInput
        maxNumberOfGroups={options.length}
        handleNumberOfGroups={handleNumberOfGroups}
        numberOfGroups={numberOfGroups}
      />
      <h2>Current List of Options</h2>
      <ol>{listOfOptions}</ol>
      <button
        onClick={clearOptions}
        disabled={options.length === 0 ? true : false}
      >
        Clear Options
      </button>
      <button
        onClick={handleSaveGroups}
      >
        Save Group
      </button>
      <br />
      <br />
      <button
        onClick={(number, choices) => randomizeGroups(numberOfGroups, options)}
        disabled={options.length === 0 ? true : false}
      >
        Randomize Into Groups!
      </button>
      <button onClick={clearGroupsAndRandomizedOption}>Clear</button>
      <button
        onClick={randomOption}
        disabled={options.length === 0 ? true : false}
      >
        Randomly Select One Option
      </button>
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
