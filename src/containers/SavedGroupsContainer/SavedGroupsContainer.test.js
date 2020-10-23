import React from 'react'
import SavedGroupsContainer from './SavedGroupsContainer'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { render } from '@testing-library/react'

const startingState = {
  savedGroupsReducer: {
    savedGroups: [
      {
        name: "Saved Group #1",
        options: ["Bob", "Sam", "Gavin"]
      },
      {
        name: "Testing",
        options: ["Bleh"]
      }
    ]
  }
}

function reducer(state = startingState, action) {
  switch(action.type) {
    case "SAVE_GROUP":
      return { ...state, savedGroups: [ ...state.savedGroups, action.payload ] }
    case "DELETE_SAVED_GROUP":
      return { ...state, savedGroups: [ ...state.savedGroups.slice(0, action.payload, ...state.savedGroups.slice(action.payload+1)) ] }
    default:
      return state
  }
}

function renderWithRedux(component, { initialState, store = createStore(reducer, initialState) } = {}) {
  return {
    ...render(<Provider store={store}>{component}</Provider>)
  }
}

it("renders with redux", () => {
  const { getByTestId } = renderWithRedux(<SavedGroupsContainer />)
  expect(getByTestId("saved-groups-container-component"))
})

it("renders correctly with the initial state", () => {
  const { getByText, getByTestId } = renderWithRedux(<SavedGroupsContainer />)
  const container = getByTestId("saved-groups-container-component")
  const allSavedGroups = container.querySelectorAll(".saved-group")
  const allOptionsList = container.querySelectorAll(".options-list")

  expect(container.querySelector(".saved-groups-list"))
  expect(allOptionsList.length).toBe(2)
  expect(allSavedGroups.length).toBe(2)
  expect(getByText("Saved Group #1"))
  expect(getByText("Testing"))
})
