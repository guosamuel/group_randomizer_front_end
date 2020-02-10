export default (state = { randomizedOption: "", randomizedOrder: [], randomizedGroups: [] }, action) => {
  switch(action.type) {
    case "CLEAR_OUTPUTS":
      return { randomizedOption: "", randomizedOrder: [], randomizedGroups: [] }
    default:
      return state
  }
}
