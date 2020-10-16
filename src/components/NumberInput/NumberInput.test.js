import React from 'react'
import NumberInput from './NumberInput'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { render } from '@testing-library/react'

it("render the component properly", () => {
  render(<NumberInput isGroups={true}/>)
})

const startingState = { maxNumber: 1 }

function reducer(state = startingState, action) {
  switch(action.type) {
    default:
      return state
  }
}

function renderWithRedux(component, { initialState, store = createStore(reducer, initialState)} = {}) {
  return {
    ...render(<Provider store={store}>{component}</Provider>)
  }
}

it("renders with redux", () => {
  const { getByTestId } = renderWithRedux(<NumberInput isGroups={true}/>)
  expect(getByTestId("number-input")).not.toBeNull()
})
