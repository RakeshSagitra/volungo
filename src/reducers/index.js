import { combineReducers } from 'redux'
import history from './history-reducer'
import launches from './launches-reducer'
import rockets from './rockets-reducer'

export default combineReducers({
  history,
  launches,
  rockets
})