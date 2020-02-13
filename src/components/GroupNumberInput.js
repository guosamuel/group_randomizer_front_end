import React, { useState } from 'react'

import { connect } from 'react-redux'
import { handleNumberOfGroups } from '../actions/optionsActions'

function GroupNumberInput(props) {
  const [ numberOfGroups, setNumberOfGroups ] = useState("1")

  const handleNumberOfGroups = e => {
    setNumberOfGroups(e.target.value)
    props.handleNumberOfGroups(e.target.value)
  }

  console.log("LOCAL STATE", numberOfGroups)

  return (
    <div>
      <h2>Number of Groups</h2>
      <input
        type="number"
        min="1"
        max={props.maxNumberOfGroups >= numberOfGroups ? props.maxNumberOfGroups : "1"}
        onChange={handleNumberOfGroups}
        value={numberOfGroups}
        style={{
          border: '1px solid'
        }}
      >
      </input>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    maxNumberOfGroups: state.optionsReducer.options.length
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleNumberOfGroups: number => dispatch(handleNumberOfGroups(number))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupNumberInput)
