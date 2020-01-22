import React from 'react'
import Heading from '../components/SavedGroupsContainer/Heading'

import { connect } from 'react-redux'
import { deleteSavedGroup } from '../actions/savedGroupsActions'

const uuidv4 = require('uuid/v4')

function SavedGroupsContainer(props){

  const deleteSavedGroup = index => {
    const updatedSavedGroupList = [...savedGroups.slice(0, index), ...savedGroups.slice(index+1)]
    // can use the logic below if I decide to switch back to an ordered list
    // updatedSavedGroupList.map( (savedGroup, index) => {
    //   if (savedGroup.name.startsWith(`Saved Group #`)) {
    //     savedGroup.name = `Saved Group #${index+1}`
    //   }
    // })
    setSavedGroups([...updatedSavedGroupList])
  }

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
            // onClick={idx => reuseSavedGroup(index)}
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
    <div>
      <Heading />
      {props.savedGroups.length ?
        <ul>
          {listOfSavedGroups}
        </ul> :
        <p>You have yet to save any groups</p>
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    savedGroups: state.savedGroupsReducer.savedGroups
  }
}
export default connect(mapStateToProps)(SavedGroupsContainer)
