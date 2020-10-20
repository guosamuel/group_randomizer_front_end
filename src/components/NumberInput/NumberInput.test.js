import React from 'react'
import NumberInput from './NumberInput'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { render , fireEvent } from '@testing-library/react'

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
  expect(getByTestId("number-input-component"))
})

it("renders with proper initial state", () => {
  const { getByTestId } = renderWithRedux(<NumberInput isGroups={true}/>)

  const numberInput = getByTestId("number-input")
  expect(getByTestId("number-input-header").textContent).toBe("Number of Groups")
  expect(numberInput.value).toBe("1")
  expect(numberInput.min).toBe("1")
  expect(numberInput.max).toBe(startingState.optionsReducer.options.length.toString())
})

it("renders with respective prop values", () => {
  const { getByTestId } = renderWithRedux(<NumberInput isGroups={false}/>)
  expect(getByTestId("number-input-header").textContent).toBe("Number of People")
})

it ("typing in numerical values", () => {
  const { getByTestId } = renderWithRedux(<NumberInput isGroups={true} />)

  expect(getByTestId("number-input").value).toBe("1")
  fireEvent.keyPress(getByTestId("number-input"), { key: '2', code: 'Digit2' })
  expect(getByTestId("number-input").value).toBe("2")
})
