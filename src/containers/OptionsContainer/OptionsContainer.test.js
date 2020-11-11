import React from 'react'
import OptionsContainer from './OptionsContainer'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'

import { render } from '@testing-library/react'

const startingState = {
  optionsReducer: {
    options: ["Sam", "Ryan", "Stephen", "David", "awefsgdgndgsfdffbsdffsgfbdfsdffsgbdsffdbfesfbfgsffbxffesgfbgbgsgrdgngrdggrsfdbgfgfbgrdbgfgfdbbgdbgbfdgfbbgfbcbfgdbcgrfdawefsgdgndgsfdffbsdffsgfbdfsdffsgbdsffdbfesfbfgsffbxffesgfbgbgsgrdgngrdggrsfdbgfgfbgrdbgfgfdbbgdbgbfdgfbbgfbcbfgdbcgrfd", "afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564"], number: "1"
  },
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
    case "ADD_OPTION":
      return {... state, optionsReducer: {...state.optionsReducer, options: [...state.optionsReducer.options, action.payload]}}
    case "REUSE_SAVED_GROUP":
      return {...state, optionsReducer: {...state.optionsReducer, options: action.payload.options}}
    case "CLEAR_OPTIONS":
      return {...state, optionsReducer: {...state.optionsReducer, options: []}}
    case "REMOVE_OPTION":
      return {...state, optionsReducer: {...state.optionsReducer, options: [...state.optionsReducer.options.slice(0, action.payload), ...state.optionsReducer.options.slice(action.payload+1)]}}
    case "HANDLE_NUMBER":
      return {...state, optionsReducer: {...state.optionsReducer, number: action.payload}}
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
  const { getByTestId } = renderWithRedux(<OptionsContainer />)
  expect(getByTestId("options-container-component"))
})

it("renders correctly with initial state", () => {
  const { getByTestId } = renderWithRedux(<OptionsContainer />)
  getByTestId("heading-options-container")
  getByTestId("note")
  getByTestId("group-name-label")
  getByTestId("group-name")
  getByTestId("options-counter")
  getByTestId("clear-options-button")
  getByTestId("save-group-button")
  getByTestId("table-options")
})
