import React from 'react'
// import ReactDOM from 'react-dom'
import Heading from './Heading'

// import { getQueriesForElement } from "@testing-library/dom"
import { render } from "@testing-library/react"

// const render = (component) => {
//   const div = document.createElement("div")
//   ReactDOM.render(component, div)
//   return getQueriesForElement(div)
// }

it("renders without crashing", () => {
  render(<Heading />)
})

it("renders the correct content", () => {
  const { getByText } = render(<Heading />)

  getByText("Saved Groups")
})
