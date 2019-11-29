import React, { useState } from 'react';
import Form from './components/Form'

function App() {
  const [ options, setOptions ] = useState([])

  const handleOptionSubmit = (e, input) => {
    e.preventDefault()
    setOptions([...options, input])
  }
  
  return (
    <div>
      <h1>Group Randomizer</h1>
      <Form handleOptionSubmit={handleOptionSubmit}/>
    </div>
  )
}

export default App;
