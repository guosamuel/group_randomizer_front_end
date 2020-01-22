export const removeOption = index => {
  return {
    type: "REMOVEOPTION",
    payload: index
  }
}

export const clearOptions = () => {
  return {
    type: "CLEAROPTIONS"
  }
}
