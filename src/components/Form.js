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
    let exists = false
    for (let i = 0; i < props.options.length; i++) {
      if (props.options[i].toLowerCase() !== option.toLowerCase()) {
        continue
      } else {
        exists = true
        break
      }
    }

    if (exists) {
      alert("The option you have put down already exists.")
    } else {
      props.addOption(option)
      clearCallback()
    }

  }

  return(
    <form onSubmit={(e, option, clearCallback) => clearAndSubmitInput(e, input, clearOptionInput)}>
      <input
        type="text"
        placeholder="Input option here"
        value={input}
        onChange={handleOptionInput}
        style={{
          border: '2px solid'
        }}
        >
      </input>
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

const mapStateToProps = state => {
  return {
    options: state.optionsReducer.options
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addOption: option => dispatch(addOption(option))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
