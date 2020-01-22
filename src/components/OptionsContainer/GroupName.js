import React from 'react'

function GroupName(props) {
  return (
    <input
      placeholder="Input group name here"
      onChange={props.handleSavingGroupNameInput}
      value={props.savingGroupName}
      style={{
        border: '1px solid'
      }}
    >
    </input>
  )
}

export default GroupName
