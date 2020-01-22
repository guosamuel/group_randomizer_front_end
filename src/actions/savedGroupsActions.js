export const deleteSavedGroup = index => {
  return {
    type: "DELETESAVEDGROUP",
    payload: index
  }
}
