import React, { useState } from 'react';

function App() {
  const [ option, setOption ] = useState([])
  const [ input, setInput ] = useState("")

  const handleOptionInput = e => {
    setInput(e.target.value)
  }

  const handleOptionSubmit = e => {
    e.preventDefault()
    setOption(option.push(input))
  }

  return (
    <div>
      <h1>Group Randomizer</h1>
      <form onSubmit={handleOptionSubmit}>
        <textarea
          placeholder="Please input options here"
          value={input}
          onChange={handleOptionInput}
          rows='5'
          cols='50'
          >
        </textarea>
        <br />
        <button type="Submit">Submit</button>
      </form>
    </div>
  )
}

export default App;
