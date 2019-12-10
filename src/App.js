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

  // function renderGroupCard(i, currentNumberOfGroups) {
  //   console.log("I'M IN THE RENDER GROUP CARD", copyOfOptions)
  //   const selectedOptions = []
  //   const randomIndex = Math.floor(Math.random() * options.length)
  //
  //   return (
  //     <div key={i+1} style={{width: '25%'}}>
  //       <h1>Group {i+1}</h1>
  //     </div>
  //   )
  // }

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
    let randomIndex = Math.floor(Math.random() * copyOfOptions.length)
    // const numberOfLargerGroups = options.length % convertedToIntegerNumber
    // const minimumNumberOfPeoplePerGroup = Math.floor(options.length/convertedToIntegerNumber)

    //outer loop is for rendering each group
    for (let j = 0; j < convertedToIntegerNumber; j++) {
      // squares.push(renderGroupCard(j, number))
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
