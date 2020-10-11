import React from 'react'
import Heading from './Heading'

import { render } from '@testing-library/react'

it('renders the component properly', () => {
  render(<Heading />)
})

it('renders the correct content', () => {
  const { getByText } = render(<Heading />)

  getByText("Current List of Options")
})
