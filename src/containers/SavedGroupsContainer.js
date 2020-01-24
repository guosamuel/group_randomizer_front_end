import React from 'react'
import Heading from '../components/SavedGroupsContainer/Heading'

import { connect } from 'react-redux'
import { deleteSavedGroup, reuseSavedGroup } from '../actions/savedGroupsActions'

const uuidv4 = require('uuid/v4')

function SavedGroupsContainer(props){

  const handleReuseSavedGroupIndex = index => {
    const reusingSavedGroup = props.savedGroups[index]
    console.log(reusingSavedGroup)
    props.reuseSavedGroup(reusingSavedGroup)
  }

  const listOfSavedGroups = props.savedGroups.map( (savedGroup, index) => {
    return (
      <li key={uuidv4()}>
        <h3>
          {savedGroup.name}
          <button
            onClick={ () => props.deleteSavedGroup(index)}
            style={{
              border: '1px solid'
            }}
          >
            X
          </button>
          <button
            onClick={ () => handleReuseSavedGroupIndex(index)}
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

const mapDispatchToProps = dispatch => {
  return {
    deleteSavedGroup: index => dispatch(deleteSavedGroup(index)),
    reuseSavedGroup: savedGroup => dispatch(reuseSavedGroup(savedGroup))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedGroupsContainer)
