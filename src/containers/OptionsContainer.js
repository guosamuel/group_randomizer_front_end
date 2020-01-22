import React, { useState } from 'react'
import Heading from '../components/OptionsContainer/Heading'
import Note from '../components/OptionsContainer/Note'
import GroupName from '../components/OptionsContainer/GroupName'

function OptionsContainer() {
  const [ savingGroupName, setSavingGroupName ] = useState("")

  const handleSavingGroupNameInput = e => {
    setSavingGroupName(e.target.value)
  }

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
        onClick={clearOptions}
        disabled={options.length === 0 ? true : false}
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

export default OptionsContainer
