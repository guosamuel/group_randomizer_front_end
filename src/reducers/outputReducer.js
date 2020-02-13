export default (state = { randomizedOption: "", randomizedOrder: [], randomizedGroups: [] }, action) => {
  switch(action.type) {
    case "CLEAR_OUTPUTS":
      return { ...state, randomizedOption: "", randomizedOrder: [], randomizedGroups: [] }
    case "RANDOM_OPTION":
      return {...state, randomizedOption: action.payload}
    case "RANDOM_ORDER":
      return {...state, randomizedOrder: action.payload}
    case "RANDOM_GROUPS":
      return {...state, randomizedGroups: action.payload}
    default:
      return state
  }
}
