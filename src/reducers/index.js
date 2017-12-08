import { combineReducers } from 'redux'

// Import reducers
import counter from './counter'
import weather from './weather'

export default combineReducers({
  // Insert Reducers
  counter,
  weather
})
