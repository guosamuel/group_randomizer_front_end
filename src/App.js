import React, { useState } from 'react';
import Form from './components/Form'

function App() {
  const [ options, setOptions ] = useState(["Sam", "Ryan", "Stephen", "David"])

  const handleOptionSubmit = (e, input) => {
    e.preventDefault()
    setOptions([...options, input])
  }

  const listOfOptions = options.map( (option, index) => <li key={index}>{option}</li>)

  return (
    <div>
      <h1>Group Randomizer</h1>
      <Form handleOptionSubmit={handleOptionSubmit}/>
      <br/>
      <ol>{listOfOptions}</ol>
    </div>
  )
}

export default App;
