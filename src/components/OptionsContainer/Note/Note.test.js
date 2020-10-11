import React from 'react'
// import ReactDOM from 'react-dom'
import Note from './Note'

import { render } from '@testing-library/react'

it("renders without crashing", () => {
  // const div = document.createElement("div")
  // ReactDOM.render(<Note />, div)
  render(<Note />)
})

it("renders the correct content", () => {
  const { getByText } = render(<Note />)

  getByText(`Note: You have the option of creating a group name for your current list of options. If you do not choose to do so, the default name will be "Saved Group #(Last Group Number)"`)
})
