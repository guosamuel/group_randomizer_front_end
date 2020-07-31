import React, { useState } from 'react'

import { connect } from 'react-redux'
import { handleNumber } from '../actions/optionsActions'

function NumberInput(props) {
  const [ number, setNumber ] = useState("1")

  const handleNumber = e => {
    setNumber(e.target.value)
    props.handleNumber(e.target.value)
  }

  return (
    <div>
      <h2>Number of {props.isGroups ? "Groups" : "People"}</h2>
      {parseInt(number, 10) <= 0 || !number ? <p>The number of {props.isGroups ? "groups" : "people"} must be filled in or greater than 0</p> : null}
      <input
        type="number"
        min="1"
        max={props.maxNumber >= number ? props.maxNumber : "1"}
        onChange={handleNumber}
        value={number}
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
    maxNumber: state.optionsReducer.options.length
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleNumber: number => dispatch(handleNumber(number))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NumberInput)
