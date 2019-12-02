import React from 'react'

function GroupNumberInput(props) {
  return (
    <div>
      <h2>Number of Groups</h2>
      <input
        type="number"
        min="1"
        max={props.maxNumberOfGroups}
        defaultValue="1"
        onChange={props.handleNumberOfGroups}
      >
      </input>
    </div>
  )
}

export default GroupNumberInput
