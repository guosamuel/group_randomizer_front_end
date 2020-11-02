import React from 'react'
import SavedGroupsContainer from './SavedGroupsContainer'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'

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
      return {
        ...state,
        savedGroupsReducer: {
          ...state.savedGroupsReducer,
          savedGroups: [ ...state.savedGroupsReducer.savedGroups, action.payload ]
        }
      }
    case "DELETE_SAVED_GROUP":
      return {
        ...state,
        savedGroupsReducer: {
          ...state.savedGroupsReducer,
          savedGroups: [ ...state.savedGroupsReducer.savedGroups.slice(0, action.payload), ...state.savedGroupsReducer.savedGroups.slice(action.payload+1) ]
        }
      }
    default:
      return state
  }
}

function renderWithRedux(component, store = createStore(reducer)) {
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
  const allOptions = container.querySelectorAll(".saved-option")
  const allSavedGroupNames = container.querySelectorAll(".saved-group-name")
  const allSavedGroupLabels = container.querySelectorAll(".saved-group-label")

  expect(container.querySelector(".saved-groups-list"))
  expect(allOptionsList.length).toBe(2)
  expect(allSavedGroups.length).toBe(2)
  expect(allOptions.length).toBe(4)
  expect(allSavedGroupLabels.length).toBe(2)

  expect(allOptions[0].textContent).toBe("Bob")
  expect(allOptions[1].textContent).toBe("Sam")
  expect(allOptions[2].textContent).toBe("Gavin")
  expect(allOptions[3].textContent).toBe("Bleh")

  expect(allSavedGroupNames[0].textContent).toBe("Saved Group #1")
  expect(allSavedGroupNames[1].textContent).toBe("Testing")

  expect(allSavedGroupLabels[0].textContent).toBe("Total Count: 3")
  expect(allSavedGroupLabels[1].textContent).toBe("Total Count: 1")

})

it("renders the correct content with no saved groups", () => {
  const emptyState = {
    savedGroupsReducer: {
      savedGroups: []
    }
  }

  const storeWithEmptyState = createStore(reducer, emptyState)

  const { getByTestId } = renderWithRedux(<SavedGroupsContainer />, storeWithEmptyState )
  const container = getByTestId("saved-groups-container-component")

  expect(getByTestId("saved-groups-empty-message").textContent).toBe("You have yet to save any groups")
  expect(container.querySelector("saved-groups-list")).toBe(null)

})

it("deletes the saved group when clicked", () => {
  const { getByTestId } = renderWithRedux(<SavedGroupsContainer />)

  userEvent.click(getByTestId("remove-button-Saved Group #1"))
  expect(getByTestId("saved-groups-container-component").querySelectorAll(".saved-group").length).toBe(1)
})
