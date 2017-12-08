import { combineReducers } from 'redux'

// Import reducers
import counter from './counter'
import weather from './weather'
import keys from './keys'
import oscillator from './oscillator'

export default combineReducers({
  // Insert Reducers
  counter,
  weather,
  keys,
  oscillator
})
