export const deletedSavedGroup = index => {
  type: "DELETESAVEDGROUP",
  payload: [...state.savedGroups.slice(0, index), ...state.savedGroups.slice(index+1)]
}
