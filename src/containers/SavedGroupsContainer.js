import React from 'react'
import Heading from '../components/SavedGroupsContainer/Heading'

import { connect } from 'react-redux'

const uuidv4 = require('uuid/v4')

//need to set savedGroups in Redux

function SavedGroupContainer(){

  const listOfSavedGroups = props.savedGroups.map( (savedGroup, index) => {
    return (
      <li key={uuidv4()}>
        <h3>
          {savedGroup.name}
          <button
            onClick={idx => deleteSavedGroup(index)}
            style={{
              border: '1px solid'
            }}
          >
            X
          </button>
          <button
            onClick={idx => reuseSavedGroup(index)}
            style={{
              border: '1px solid'
            }}
          >
            Re-use This Group
          </button>
        </h3>
        <ul>
        {savedGroup.options.map( savedOption => {
          return (
            <li key={uuidv4()}>
              {savedOption}
            </li>
          )
        })}
        </ul>
      </li>
    )
  })
  return (
    <Heading />
    {savedGroups.length ?
      <ul>
        {listOfSavedGroups}
      </ul> :
      <p>You have yet to save any groups</p>
    }
  )
}

const mapStateToProps = state => {
  return {
    savedGroups: state.savedGroupsReducer.savedGroups
  }
}
export default connect(mapStateToProps)(SavedGroupContainer)
