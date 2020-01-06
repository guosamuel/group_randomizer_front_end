import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import GroupNumberInput from './components/GroupNumberInput';

function App() {
  const [ options, setOptions ] = useState(["Sam", "Ryan", "Stephen", "David"])
  const [ numberOfGroups, setNumberOfGroups ] = useState("1")
  const [ groups, setGroups ] = useState([])
  const [ groupSize, setGroupSize ] = useState(1)
  const [ randomizedOption, setRandomizedOption ] = useState("")
  // savedGroups shall be an array of objects
  // the object structure shall be {name: TBD, options: TBD}
  const [ savedGroups, setSavedGroups ] = useState([])
  const [ savingGroupName, setSavingGroupName ] = useState("")
  const [ randomizedOrder, setRandomizedOrder ] = useState([])

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

  const uuidv4 = require('uuid/v4')

  const handleOptionSubmit = (e, input) => {
    e.preventDefault()
    setOptions([...options, input])
  }

  const handleNumberOfGroups = e => {
    setNumberOfGroups(e.target.value)
  }

  function renderGroupCard(i, currentNumberOfGroups, arrayOfOptions) {
    const listOfGroupOptions = arrayOfOptions.map( (option, index) => <li key={uuidv4()}>{option}</li>)
    return (
      <div key={uuidv4()} style={{width: '25%'}}>
        <h1>Group {i+1}</h1>
        <ul>{listOfGroupOptions}</ul>
      </div>
    )
  }

  const randomizeGroups = (number, choices) => {
    setRandomizedOption("")
    setRandomizedOrder([])
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

  const clear = () => {
    setGroups([])
    setRandomizedOption("")
    setRandomizedOrder([])
  }

  const clearOptions = () => {
    setOptions([])
  }

  const randomOption = () => {
    setGroups([])
    setRandomizedOrder([])
    setRandomizedOption(options[Math.floor(Math.random() * options.length)])
  }

  const removeOption = idx => {
    const updatedList = [...options.slice(0, idx), ...options.slice(idx+1)]
    setOptions([...updatedList])
  }

  const listOfOptions = options.map( (option, index) => {
    return (
      <li key={uuidv4()}>
        {option}
        <button onClick={ idx => removeOption(index)}>X</button>
      </li>
    )
  })

  const deleteSavedGroup = index => {
    const updatedSavedGroupList = [...savedGroups.slice(0, index), ...savedGroups.slice(index+1)]
    // can use the logic below if I decide to switch back to an ordered list
    // updatedSavedGroupList.map( (savedGroup, index) => {
    //   if (savedGroup.name.startsWith(`Saved Group #`)) {
    //     savedGroup.name = `Saved Group #${index+1}`
    //   }
    // })
    setSavedGroups([...updatedSavedGroupList])
  }

  const reuseSavedGroup = index => {
    setOptions([...savedGroups[index].options])
  }

  const listOfSavedGroups = savedGroups.map( (savedGroup, index) => {
    return (
      <li key={uuidv4()}>
        <h3>
          {savedGroup.name}
          <button onClick={idx => deleteSavedGroup(index)}>X</button>
          <button onClick={idx => reuseSavedGroup(index)}>Re-use This Group</button>
        </h3>
        <ul>
        {savedGroup.options.map( savedOption => {
          return (
            <li key={uuidv4()}>
              {savedOption}
            </li>
          )
        })}
        </ul>
      </li>
    )
  })

  const sameGroup = savingGroup => {

    const savingGroupHash = {}

    if (savingGroup.length !== options.length) {
      return false
    }

    for (let j = 0; j < savingGroup.length; j++) {
      savingGroupHash[savingGroup[j].toLowerCase()] = true
    }

    for (let k = 0; k < options.length; k++) {
      if (!savingGroupHash.hasOwnProperty(options[k].toLowerCase())) {
        return false
      }
    }

    return true
  }

  const handleSaveGroup = () => {
    if (savedGroups.length === 0) {
      setSavedGroups([{name: (savingGroupName ? savingGroupName : `Saved Group #1`), options: options}])
      setSavingGroupName("")
    } else {
      // we want to stop as soon as we discover an existing saved group
      let i = 0
      let savedGroupExist = false
      while (i < savedGroups.length && !savedGroupExist) {
        if (sameGroup(savedGroups[i].options)) {
          savedGroupExist = true
          alert(`A saved group with your current list of options already exist. It is ${savedGroups[i].name}`)
        }
        i++
      }
      if (!savedGroupExist) {
        setSavedGroups([...savedGroups, {name: (savingGroupName ? savingGroupName : `Saved Group #${savedGroups.length+1}`), options: options}])
        setSavingGroupName("")
      }
    }
  }

  const handleSavingGroupNameInput = e => {
    setSavingGroupName(e.target.value)
  }

  const randomizeOrder = () => {
    setGroups([])
    setRandomizedOption("")
    const copyOfOptions = [...options]
    const randomOrder = []
    while (copyOfOptions.length > 0) {
      let randomIndex = Math.floor(Math.random() * copyOfOptions.length)
      randomOrder.push(copyOfOptions[randomIndex])
      copyOfOptions.splice(randomIndex, 1)
    }
    setRandomizedOrder([...randomOrder])
  }

  const randomizedOrderList = randomizedOrder.map( option => {
    return(
      <li key={uuidv4()}>
        {option}
      </li>
    )
  })

  console.log(randomizedOrder)

  return (
    <div>
      <h1>Group Randomizer</h1>
      <Form handleOptionSubmit={handleOptionSubmit}/>
      <br/>
      <h2>Saved Groups</h2>
      {savedGroups.length ?
        <ul>
          {listOfSavedGroups}
        </ul> :
        <p>You have yet to save any groups</p>
      }
      <br/>
      <GroupNumberInput
        maxNumberOfGroups={options.length}
        handleNumberOfGroups={handleNumberOfGroups}
        numberOfGroups={numberOfGroups}
      />
      <h2>Current List of Options</h2>
      <label>Note: You have the option of creating a group name for your current list of options. If you do not choose to do so, the default name will be "Saved Group #(Last Group Number)"</label>
      <br/>
      <br/>
      <label>Group Name:</label>
      <br />
      <input
        placeholder="Input group name here"
        onChange={handleSavingGroupNameInput}
        value={savingGroupName}
      >
      </input>
      <ol>{listOfOptions}</ol>
      <button
        onClick={clearOptions}
        disabled={options.length === 0 ? true : false}
      >
        Clear Options
      </button>
      <button
        onClick={handleSaveGroup}
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
      <button onClick={clear}>Clear</button>
      <button
        onClick={randomOption}
        disabled={options.length === 0 ? true : false}
      >
        Randomly Select One Option
      </button>
      <button
        onClick={randomizeOrder}
        disabled={options.length === 0 ? true : false}
      >
        Randomize Order
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
      {randomizedOrder.length === 0 ? null :
      <div>
        <ol>
          {randomizedOrderList}
        </ol>
      </div>}
    </div>
  )
}

export default App;
