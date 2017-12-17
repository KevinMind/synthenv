var initialState = {
  "volume": 0.5,
  "filter_cutoff": 0.5,
  "filter_resonance": 0.5,
  "wave": "sine"
}


function wave(state, action) {
  switch (action.type) {
    case "SET_WAVE":
      return action.wave
    default:
      return state
  }
}

export default function(state=initialState, action) {
  switch (action.type) {
    case "SET_PARAM":
      for(const parameter in state) {
        if(parameter === action.parameter.name) {
          state[`${parameter}`] = action.parameter.value
          return state
        }
      }
      return state
    case "SET_WAVE":
      return Object.assign({}, state, {
        wave: wave(state.wave, action)
      })
    default:
      return state
  }
}
