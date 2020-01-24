export default (state = { savedGroups: [{name: "Saved Group #1", options: ["Bob", "Sam", "Gavin"]}, {name: "Testing", options: ["Bleh"]}] }, action) => {
  switch(action.type) {
    case "SAVEGROUP":
      return {savedGroups: [...stateSavedGroups, action.payload]}
    case "DELETESAVEDGROUP":
      return {savedGroups: [...state.savedGroups.slice(0, action.payload), ...state.savedGroups.slice(action.payload+1)]}
    default:
      return state
  }
}
