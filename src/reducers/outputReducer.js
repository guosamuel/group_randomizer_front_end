export default (state = { randomizedOption: "", randomizedOrder: [], randomizedGroups: [] }, action) => {
  switch(action.type) {
    case "CLEAR_OUTPUTS":
      return { randomizedOption: "", randomizedOrder: [], randomizedGroups: [] }
    case "RANDOM_OPTION":
      return {...state, randomizedOption: action.payload}
    default:
      return state
  }
}
