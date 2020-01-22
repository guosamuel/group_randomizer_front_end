import React, { useState } from 'react'
import Heading from '../components/OptionsContainer/Heading'
import Note from '../components/OptionsContainer/Note'
import GroupName from '../components/OptionsContainer/GroupName'

import { connect } from 'react-redux'
import { removeOption, clearOptions } from '../actions/optionsActions'

function OptionsContainer(props) {
  const [ savingGroupName, setSavingGroupName ] = useState("")

  const uuidv4 = require('uuid/v4')

  const handleSavingGroupNameInput = e => {
    setSavingGroupName(e.target.value)
  }

  const listOfOptions = props.options.map( (option, index) => {
    return (
      <li key={uuidv4()}>
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

  return (
    <div>
      <Heading />
      <Note />
      <br/>
      <br/>
      <label>Group Name:</label>
      <br />
      <GroupName
        handleSavingGroupNameInput={handleSavingGroupNameInput}
        savingGroupName={savingGroupName}
      />
      <ol>{listOfOptions}</ol>
      <button
        onClick={props.clearOptions}
        disabled={props.options.length === 0 ? true : false}
        style={{
        border: '1px solid'
        }}
      >
        Clear Options
      </button>
      <button
        onClick={handleSaveGroup}
        style={{
          border: '1px solid'
        }}
      >
        Save Group
      </button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    options: state.options
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeOption: dispatch( index => removeOption(index)),
    clearOptions: dispatch( () => clearOptions())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OptionsContainer)
