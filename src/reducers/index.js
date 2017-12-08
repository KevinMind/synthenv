import { combineReducers } from 'redux'

// Import reducers
import counter from './counter'
import weather from './weather'
import keys from './downKeys'

export default combineReducers({
  // Insert Reducers
  counter,
  weather,
  keys
})
