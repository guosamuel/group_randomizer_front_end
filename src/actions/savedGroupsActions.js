export const deleteSavedGroup = index => {
  return {
    type: "DELETESAVEDGROUP",
    payload: index
  }
}

export const saveGroup = group => {
  type: "SAVEGROUP",
  payload: group
}

// goes to the optionsReducer
export const reuseSavedGroup = index => {
  return {
    type: "REUSESAVEDGROUP",
    payload: index
  }
}
