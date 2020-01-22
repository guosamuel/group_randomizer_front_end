export default (state = { options: ["Sam", "Ryan", "Stephen", "David"] }, action) => {
  switch(action.type) {
    case "CLEAROPTIONS":
      return {options: []}
    case "REMOVEOPTION":
      return {options: [...state.options.slice(0, action.payload), ...state.options.slice(action.payload+1)]}
    default:
      return state
  }
}
