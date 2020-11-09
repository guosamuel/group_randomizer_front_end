import React, { useState } from 'react'
import Heading from '../../components/OptionsContainer/Heading/Heading'
import Note from '../../components/OptionsContainer/Note/Note'
import GroupName from '../../components/OptionsContainer/GroupName/GroupName'

import '../../css/OptionsContainer.css'

import { connect } from 'react-redux'
import { removeOption, clearOptions } from '../../actions/optionsActions'
import { saveGroup } from '../../actions/savedGroupsActions'

function OptionsContainer(props) {
  const [ savingGroupName, setSavingGroupName ] = useState("")

  const uuidv4 = require('uuid/v4')

  const handleSavingGroupNameInput = e => {
    setSavingGroupName(e.target.value)
  }

  const listOfOptions = props.options.map( (option, index) => {
    return (
      <li key={uuidv4()} style={{marginTop: '10px', marginBottom: '10px'}}>
        {option}
        <button
          onClick={ () => props.removeOption(index)}
          style={{
            border: '1px solid'
          }}
        >
          X
        </button>
      </li>
    )
  })

  const tabularOptions = props.options.map( (option, index) => {
    let longWordCSS = option.includes(" ") ? " not-one-long-word" : " one-long-word"

    return (
      <tr>
        <td className={'option-width' + longWordCSS}>{option}</td>
        <td width="60px">
          <p className="remove" onClick={ () => props.removeOption(index)}>Remove</p>
        </td>
      </tr>
    )
  })

  const handleSaveGroup = () => {
    if (props.savedGroups.length === 0) {
      props.saveGroup({name: (savingGroupName ? savingGroupName : `Saved Group #1`), options: props.options})
      setSavingGroupName("")
    } else {
      // we want to stop as soon as we discover an existing saved group
      let i = 0
      let savedGroupExist = false
      while (i < props.savedGroups.length && !savedGroupExist) {
        if (sameGroup(props.savedGroups[i].options)) {
          savedGroupExist = true
          alert(`A saved group with your current list of options already exist. It is ${props.savedGroups[i].name}`)
        }
        i++
      }
      if (!savedGroupExist) {
        props.saveGroup({name: (savingGroupName ? savingGroupName : `Saved Group #${props.savedGroups.length+1}`), options: props.options})
        setSavingGroupName("")
      }
    }
  }

  const sameGroup = savingGroup => {

    const savingGroupHash = {}

    if (savingGroup.length !== props.options.length) {
      return false
    }

    for (let j = 0; j < savingGroup.length; j++) {
      savingGroupHash[savingGroup[j].toLowerCase()] = true
    }

    for (let k = 0; k < props.options.length; k++) {
      if (!savingGroupHash.hasOwnProperty(props.options[k].toLowerCase())) {
        return false
      }
    }

    return true
  }

  return (
    <div data-testid="options-container-component" className="Options-container">
      <Heading />
      <Note />
      <label data-testid="group-name-label">Group Name:</label>
      <br />
      <GroupName
        handleSavingGroupNameInput={handleSavingGroupNameInput}
        savingGroupName={savingGroupName}
      />
      <br />
      <br />
      <label data-testid="options-counter">Total Count: {props.options.length}</label>
      {/*
      <div className="options-list">
        <ol style={{wordBreak: 'break-all'}}>{listOfOptions}</ol>
      </div>
      */}
      <br />
      <br />
      <table>
        {tabularOptions}
      </table>
      <br />
      <br />
      <button
        onClick={props.clearOptions}
        disabled={props.options.length === 0 ? true : false}
        style={{
        border: '1px solid'
        }}
        data-testid="clear-options-button"
      >
        Clear Options
      </button>
      <button
        onClick={handleSaveGroup}
        disabled={props.options.length === 0 ? true : false}
        style={{
          border: '1px solid'
        }}
        data-testid="save-group-button"
      >
        Save Group
      </button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    options: state.optionsReducer.options,
    savedGroups: state.savedGroupsReducer.savedGroups
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeOption: index => dispatch(removeOption(index)),
    clearOptions: () => dispatch(clearOptions()),
    saveGroup: group => dispatch(saveGroup(group))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionsContainer)
