import React from 'react'
import NumberInput from './NumberInput'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { render } from '@testing-library/react'

const startingState = {
  optionsReducer: {
    options: [
      "Sam",
      "Ryan",
      "Stephen",
      "David",
      "awefsgdgndgsfdffbsdffsgfbdfsdffsgbdsffdbfesfbfgsffbxffesgfbgbgsgrdgngrdggrsfdbgfgfbgrdbgfgfdbbgdbgbfdgfbbgfbcbfgdbcgrfdawefsgdgndgsfdffbsdffsgfbdfsdffsgbdsffdbfesfbfgsffbxffesgfbgbgsgrdgngrdggrsfdbgfgfbgrdbgfgfdbbgdbgbfdgfbbgfbcbfgdbcgrfd", "afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564"
    ],
    number: "1"
  }
 }

function reducer(state = startingState, action) {
  switch(action.type) {
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
  const { getByTestId } = renderWithRedux(<NumberInput isGroups={true}/>)
  expect(getByTestId("number-input"))
})

it("renders with proper initial state", () => {
  const { getByTestId } = renderWithRedux(<NumberInput isGroups={true}/>)
  expect(getByTestId("number-input").textContent).toBe("Number of Groups")
})

it("renders with respective prop values", () => {
  const { getByTestId } = renderWithRedux(<NumberInput isGroups={true}/>)
  expect(getByTestId("number-input").textContent).toBe("Number of Groups")
})

it("renders with respective prop values", () => {
  const { getByTestId } = renderWithRedux(<NumberInput isGroups={false}/>)
  expect(getByTestId("number-input").textContent).toBe("Number of People")
})
