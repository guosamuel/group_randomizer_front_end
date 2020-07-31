import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import NumberInput from './components/NumberInput';
import SavedGroupContainer from './containers/SavedGroupsContainer'
import OptionsContainer from './containers/OptionsContainer'
import ToggleButton from 'react-toggle-button'

import './css/App.css'

import { connect } from 'react-redux'
import { clearOutputs, randomizeOption, randomizeOrder, randomizeGroups } from './actions/outputActions'
import { handleNumber } from './actions/optionsActions'

function App(props) {
  const [ isGroups, setIsGroups ] = useState(true)
  // const [ options, setOptions ] = useState(["Sam", "Ryan", "Stephen", "David"])
  // const [ numberOfGroups, setNumberOfGroups ] = useState("1")
  // const [ groups, setGroups ] = useState([])
  // const [ groupSize, setGroupSize ] = useState(1)
  // const [ randomizedOption, setRandomizedOption ] = useState("")
  // savedGroups shall be an array of objects
  // the object structure shall be {name: TBD, options: TBD}
  // const [ savedGroups, setSavedGroups ] = useState([])
  // const [ savingGroupName, setSavingGroupName ] = useState("")
  // const [ randomizedOrder, setRandomizedOrder ] = useState([])

  useEffect(() => {
    //this is when a person deletes options, the maxNumberOfGroups should reflect the max length of the options
    if (props.options.length < parseInt(props.number, 10)) {
      if (props.options.length === 0) {
        // setNumberOfGroups((props.options.length + 1).toString())
        props.handleNumber((props.options.length + 1).toString())
      } else {
      // setNumberOfGroups(props.options.length.toString())
      props.handleNumber(props.options.length.toString())
      }
    }
    // setGroupSize(Math.floor(props.options.length/parseInt(props.numberOfGroups, 10)))
  }, [props.options.length, props.number])

  const uuidv4 = require('uuid/v4')

  const borderRadiusStyle = { borderRadius: 2 }
  // const handleOptionSubmit = (e, input) => {
  //   e.preventDefault()
  //   setOptions([...options, input])
  // }

  // const handleNumberOfGroups = e => {
  //   setNumberOfGroups(e.target.value)
  // }

  // function renderGroupCard(i, arrayOfOptions) {
  //   const listOfGroupOptions = arrayOfOptions.map( option => <li key={uuidv4()}>{option}</li>)
  //   return (
  //     <div key={uuidv4()} style={{width: '33%', border: '1px solid'}}>
  //       <h1>Group {i+1}</h1>
  //       <ul>{listOfGroupOptions}</ul>
  //     </div>
  //   )
  // }

  const renderGroupCards = props.randomizedGroups.map( (group, index) => {
    const listOfGroupOptions = group.map( option => {
      let longWordCSS = option.includes(" ") ? " not-one-long-word" : " one-long-word"
      return <li key={uuidv4()} className={'option' + longWordCSS}>{option}</li>
    })
    return (
      <div key={uuidv4()} style={{width: '33%', border: '1px solid'}}>
        <h1>Group {index+1}</h1>
        <ul
          style={{
            listStyleType: 'none',
            margin: 0,
            padding: 0
          }}
        >
            {listOfGroupOptions}
        </ul>
      </div>
    )
  })

  const randomizeGroups = (number, choices) => {
    props.clearOutputs()
    // setRandomizedOption("")
    // setRandomizedOrder([])
    const copyOfOptions = [...props.options]
    const convertedToIntegerNumber = parseInt(number, 10)
    const selectedOptions = []
    if (isGroups) {

      // const squares = []

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

      // for (let j = 0; j < convertedToIntegerNumber; j++) {
      //   squares.push(renderGroupCard(j, selectedOptions[j]))
      // }

      // setGroups(squares)
      props.randomizeGroups(selectedOptions)
    } else {
      let totalNumberOfGroups = Math.floor(copyOfOptions.length/convertedToIntegerNumber)
      for (let i = 0; i < totalNumberOfGroups; i++) {
        selectedOptions.push([])
      }
      let randomIndex

      for (let i = 0; i < selectedOptions.length; i++) {
        for (let j = 0; j < convertedToIntegerNumber; j++) {
          randomIndex = Math.floor(Math.random() * copyOfOptions.length)
          selectedOptions[i].push(copyOfOptions[randomIndex])
          copyOfOptions.splice(randomIndex, 1)
        }
      }

      if (copyOfOptions.length !== 0) selectedOptions.push([...copyOfOptions])
      props.randomizeGroups(selectedOptions)
    }
  }

  const clearOutputs = () => {
    props.clearOutputs()
    // setGroups([])
    // setRandomizedOption("")
    // setRandomizedOrder([])
  }

  // const clearOptions = () => {
  //   setOptions([])
  // }

  const randomOption = () => {
    props.clearOutputs()
    // setGroups([])
    // setRandomizedOrder([])
    const chosenRandomOption = props.options[Math.floor(Math.random() * props.options.length)]
    props.randomizeOption(chosenRandomOption)
  }

  // const removeOption = idx => {
  //   const updatedList = [...options.slice(0, idx), ...options.slice(idx+1)]
  //   setOptions([...updatedList])
  // }

  // const listOfOptions = options.map( (option, index) => {
  //   return (
  //     <li key={uuidv4()}>
  //       {option}
  //       <button
  //         onClick={ idx => removeOption(index)}
  //         style={{
  //           border: '1px solid'
  //         }}
  //       >
  //         X
  //       </button>
  //     </li>
  //   )
  // })

  // const deleteSavedGroup = index => {
  //   const updatedSavedGroupList = [...savedGroups.slice(0, index), ...savedGroups.slice(index+1)]
  //   // can use the logic below if I decide to switch back to an ordered list
  //   // updatedSavedGroupList.map( (savedGroup, index) => {
  //   //   if (savedGroup.name.startsWith(`Saved Group #`)) {
  //   //     savedGroup.name = `Saved Group #${index+1}`
  //   //   }
  //   // })
  //   setSavedGroups([...updatedSavedGroupList])
  // }

  // const reuseSavedGroup = index => {
  //   setOptions([...savedGroups[index].options])
  // }

  // const listOfSavedGroups = savedGroups.map( (savedGroup, index) => {
  //   return (
  //     <li key={uuidv4()}>
  //       <h3>
  //         {savedGroup.name}
  //         <button
  //           onClick={idx => deleteSavedGroup(index)}
  //           style={{
  //             border: '1px solid'
  //           }}
  //         >
  //           X
  //         </button>
  //         <button
  //           onClick={idx => reuseSavedGroup(index)}
  //           style={{
  //             border: '1px solid'
  //           }}
  //         >
  //           Re-use This Group
  //         </button>
  //       </h3>
  //       <ul>
  //       {savedGroup.options.map( savedOption => {
  //         return (
  //           <li key={uuidv4()}>
  //             {savedOption}
  //           </li>
  //         )
  //       })}
  //       </ul>
  //     </li>
  //   )
  // })

  // const sameGroup = savingGroup => {
  //
  //   const savingGroupHash = {}
  //
  //   if (savingGroup.length !== options.length) {
  //     return false
  //   }
  //
  //   for (let j = 0; j < savingGroup.length; j++) {
  //     savingGroupHash[savingGroup[j].toLowerCase()] = true
  //   }
  //
  //   for (let k = 0; k < options.length; k++) {
  //     if (!savingGroupHash.hasOwnProperty(options[k].toLowerCase())) {
  //       return false
  //     }
  //   }
  //
  //   return true
  // }

  // const handleSaveGroup = () => {
  //   if (savedGroups.length === 0) {
  //     setSavedGroups([{name: (savingGroupName ? savingGroupName : `Saved Group #1`), options: options}])
  //     setSavingGroupName("")
  //   } else {
  //     // we want to stop as soon as we discover an existing saved group
  //     let i = 0
  //     let savedGroupExist = false
  //     while (i < savedGroups.length && !savedGroupExist) {
  //       if (sameGroup(savedGroups[i].options)) {
  //         savedGroupExist = true
  //         alert(`A saved group with your current list of options already exist. It is ${savedGroups[i].name}`)
  //       }
  //       i++
  //     }
  //     if (!savedGroupExist) {
  //       setSavedGroups([...savedGroups, {name: (savingGroupName ? savingGroupName : `Saved Group #${savedGroups.length+1}`), options: options}])
  //       setSavingGroupName("")
  //     }
  //   }
  // }

  // const handleSavingGroupNameInput = e => {
  //   setSavingGroupName(e.target.value)
  // }

  const randomizeOrder = () => {
    props.clearOutputs()
    // setGroups([])
    // setRandomizedOption("")
    const copyOfOptions = [...props.options]
    const randomOrder = []
    while (copyOfOptions.length > 0) {
      let randomIndex = Math.floor(Math.random() * copyOfOptions.length)
      randomOrder.push(copyOfOptions[randomIndex])
      copyOfOptions.splice(randomIndex, 1)
    }
    // setRandomizedOrder([...randomOrder])
    props.randomizeOrder(randomOrder)
  }

  const randomizedOrderList = props.randomizedOrder.map( option => {
    let longWordCSS = option.includes(" ") ? " not-one-long-word" : " one-long-word"
    return(
      <li key={uuidv4()} className={'option' + longWordCSS}>
        {option}
      </li>
    )
  })

  return (
    <div className='App'>
      <h1>Group Randomizer</h1>
      <Form />
      <br/>
      <OptionsContainer />
      <br/>
      <NumberInput isGroups={isGroups}/>
      <br />
      <div style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        {/* GROUPS = true PEOPLE = false for toggle values */}
        <label style={{ paddingRight: '5px' }}>PEOPLE</label>
        <ToggleButton
          inactiveLabel={""}
          activeLabel={""}
          thumbStyle={borderRadiusStyle}
          trackStyle={borderRadiusStyle}
          value={ isGroups }
          onToggle={() => setIsGroups(!isGroups)}
        />
        <label style={{ paddingLeft: '5px' }}>GROUPS</label>
      </div>
      <br />
      <br />
      <button
        onClick={(number, choices) => randomizeGroups(props.number, props.options)}
        disabled={props.options.length === 0 || !props.number || parseInt(props.number,10) <= 0 ? true : false}
        style={{
          border: '1px solid'
        }}
      >
        Randomly Split Into Groups!
      </button>
      <button
        onClick={clearOutputs}
        disabled={(props.options.length === 0 && props.randomizedGroups.length === 0) || !props.number || parseInt(props.number,10) <= 0 ? true : false}
        style={{
          border: '1px solid'
        }}
      >
        Clear
      </button>
      <button
        onClick={randomOption}
        disabled={props.options.length === 0 || !props.number || parseInt(props.number,10) <= 0 ? true : false}
        style={{
          border: '1px solid'
        }}
      >
        Randomly Select One Option
      </button>
      <button
        onClick={randomizeOrder}
        disabled={props.options.length === 0 || !props.number || parseInt(props.number,10) <= 0 ? true : false}
        style={{
          border: '1px solid'
        }}
      >
        Randomize Order
      </button>
      <br />
      <br />
      {props.randomizedGroups.length === 0 && props.randomizedOption.length === 0 && props.randomizedOrder.length === 0 ?
        <div>
          <h2>Yet to be randomized</h2>
        </div> : null
      }
      {props.randomizedGroups.length !== 0 ?
        <div
          id="group-card-container"
          style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center'
          }}
        >
          {renderGroupCards}
        </div> : null
      }
      {props.randomizedOption.length !== 0 ?
        <div>
          <h2>Your randomized choice is:</h2>
          <p className={(props.randomizedOption.includes(" ") ? 'not-one-long-word' : 'one-long-word') + ' padding-center'}>{props.randomizedOption}</p>
        </div> : null
      }
      {props.randomizedOrder.length !== 0 ?
        <div>
          <h2>Your randomized order is:</h2>
          <ol className='padding-center'>
            {randomizedOrderList}
          </ol>
        </div> : null
      }
      <SavedGroupContainer />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    randomizedOption: state.outputReducer.randomizedOption,
    options: state.optionsReducer.options,
    randomizedOrder: state.outputReducer.randomizedOrder,
    number: state.optionsReducer.number,
    randomizedGroups: state.outputReducer.randomizedGroups
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearOutputs: () => dispatch(clearOutputs()),
    randomizeOption: option => dispatch(randomizeOption(option)),
    randomizeOrder: options => dispatch(randomizeOrder(options)),
    randomizeGroups: groups => dispatch(randomizeGroups(groups)),
    handleNumber: number => dispatch(handleNumber(number))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
