import { combineReducers } from 'redux'
import savedGroupsReducer from './savedGroupsReducer'
import optionsReducer from './optionsReducer'
import outputReducer from './outputReducer'

export default combineReducers({
  savedGroupsReducer,
  optionsReducer,
  outputReducer
})
