import React from 'react'

function Note() {
  return (
    <p style={{
      paddingLeft: '25vw',
      paddingRight: '25vw',
      whiteSpace: 'pre-line',
      wordWrap: 'break-word'
      }}
    >
      Note: You have the option of creating a group name for your current list of options.
      If you do not choose to do so, the default name will be "Saved Group #(Last Group Number)"
    </p>
  )
}

export default Note
