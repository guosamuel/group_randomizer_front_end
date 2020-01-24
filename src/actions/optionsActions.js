export const removeOption = index => {
  return {
    type: "REMOVE_OPTION",
    payload: index
  }
}

export const clearOptions = () => {
  return {
    type: "CLEAR_OPTIONS"
  }
}
