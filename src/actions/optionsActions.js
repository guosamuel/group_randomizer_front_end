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

export const addOption = option => {
  return {
    type: "ADD_OPTION",
    payload: option
  }
}

export const handleNumberOfGroups = number => {
  return {
    type: "HANDLE_NUMBER_OF_GROUPS",
    payload: number
  }
}