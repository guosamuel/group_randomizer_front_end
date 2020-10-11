import React from 'react'
import NumberInput from './NumberInput'

import { render } from '@testing-library/react'

it("render the component properly", () => {
  render(<NumberInput isGroups={true}/>)
})
