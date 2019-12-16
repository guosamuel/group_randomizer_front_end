import React from 'react'

function GroupNumberInput(props) {
  return (
    <div>
      <h2>Number of Groups</h2>
      <input
        type="number"
        min="1"
        max={props.maxNumberOfGroups > props.numberOfGroups ? props.maxNumberOfGroups : "1"}
        onChange={props.handleNumberOfGroups}
        value={props.numberOfGroups}
      >
      </input>
    </div>
  )
}

export default GroupNumberInput
