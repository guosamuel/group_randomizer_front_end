import React, { useState } from 'react'

function Form(props) {
  const [ input, setInput ] = useState("")

  const handleOptionInput = e => {
    setInput(e.target.value)
  }

  const clearOptionInput = () => {
    setInput("")
  }

  const clearAndSubmitInput = (e, option, clearCallback) => {
    props.handleOptionSubmit(e, option)
    clearCallback()
  }

  return(
    <form onSubmit={(e, option, clearCallback) => clearAndSubmitInput(e, input, clearOptionInput)}>
      <textarea
        type="text"
        placeholder="Please input options here"
        value={input}
        onChange={handleOptionInput}
        rows='5'
        cols='50'
        style={{
          border: '2px solid'
        }}
        >
      </textarea>
      <br />
      <button
        type="Submit"
        disabled={!input}
        style={{
          border: '1px solid'
        }}
        >
        Submit
      </button>
    </form>
  )
}

export default Form;
