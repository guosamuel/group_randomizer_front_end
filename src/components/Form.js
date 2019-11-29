import React, { useState } from 'react'

function Form(props) {
  const [ input, setInput ] = useState("")

  const handleOptionInput = e => {
    setInput(e.target.value)
  }

  const clearOptionInput = () => {
    setInput("")
  }

  return(
    <form onSubmit={(e, option, clear) => props.handleOptionSubmit(e, input, clearOptionInput())}>
      <textarea
        type="text"
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
  )
}

export default Form;
