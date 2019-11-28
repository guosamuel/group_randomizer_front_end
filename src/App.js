import React, { useState } from 'react';

function App() {
  const [ option, setOption ] = useState([])
  const [ input, setInput ] = useState("")

  return (
    <div>
      <h1>Group Randomizer</h1>
      <form>
        <textarea
          placeholder="Please input options here"
          >
        </textarea>
        <br />
        <button type="Submit">Submit</button>
      </form>
    </div>
  )
}

export default App;
