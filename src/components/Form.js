import React, { useState } from 'react'

import { connect } from 'react-redux'
import { addOption } from '../actions/optionsActions'

function Form(props) {
  const [ input, setInput ] = useState("")

  const handleOptionInput = e => {
    setInput(e.target.value)
  }

  const clearOptionInput = () => {
    setInput("")
  }

  const clearAndSubmitInput = (e, option, clearCallback) => {
    e.preventDefault()
    // props.handleOptionSubmit(e, option)
    props.addOption(option)
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

const mapDispatchToProps = dispatch => {
  return {
    addOption: option => dispatch(addOption(option))
  }
}

export default connect(null, mapDispatchToProps)(Form);
