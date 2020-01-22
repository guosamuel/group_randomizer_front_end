import React from 'react'

function OptionsContainer() {

  return (
    <div>
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
        style={{
          border: '1px solid'
        }}
      >
      </input>
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
  }
}

export default OptionsContainer
