export const deleteSavedGroup = index => {
  return {
    type: "DELETESAVEDGROUP",
    payload: index
  }
}

// goes to the optionsReducer
export const reuseSavedGroup = index => {
  return {
    type: "REUSESAVEDGROUP",
    payload: index
  }
}
