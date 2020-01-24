export const deleteSavedGroup = index => {
  return {
    type: "DELETE_SAVED_GROUP",
    payload: index
  }
}

export const saveGroup = group => {
  return {
    type: "SAVE_GROUP",
    payload: group
  }
}

// goes to the optionsReducer
export const reuseSavedGroup = index => {
  return {
    type: "REUSE_SAVED_GROUP",
    payload: index
  }
}
