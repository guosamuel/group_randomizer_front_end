import { combineReducers } from 'redux'
import savedGroupsReducer from './savedGroupsReducer'
import optionsReducer from './optionsReducer'

export default combineReducers({
  savedGroupsReducer,
  optionsReducer
})
