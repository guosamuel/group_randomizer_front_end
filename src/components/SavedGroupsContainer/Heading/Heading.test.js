import React from 'react'
import ReactDOM from 'react-dom'
import Heading from './Heading'

import { getQueriesForElement } from "@testing-library/dom"

it("renders without crashing", () => {
  const div = document.createElement("div")
  ReactDOM.render(<Heading />, div)
})

it("renders the correct content", () => {
  const div = document.createElement("div")
  ReactDOM.render(<Heading />, div)

  const { getByText } = getQueriesForElement(div)

  getByText("Saved Groups")
})
