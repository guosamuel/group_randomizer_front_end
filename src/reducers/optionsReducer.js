export default (state = { options: ["Sam", "Ryan", "Stephen", "David"], numberOfGroups: "1" }, action) => {
  switch(action.type) {
    case "ADD_OPTION":
      return {... state, options: [...state.options, action.payload]}
    case "REUSE_SAVED_GROUP":
      return {...state, options: action.payload.options}
    case "CLEAR_OPTIONS":
      return {...state, options: []}
    case "REMOVE_OPTION":
      return {...state, options: [...state.options.slice(0, action.payload), ...state.options.slice(action.payload+1)]}
    case "HANDLE_NUMBER_OF_GROUPS":
      return {...state, numberOfGroups: action.payload}
    default:
      return state
  }
}
