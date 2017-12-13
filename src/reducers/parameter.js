var initialState = {
  "volume": 0.5,
  "filter_cutoff": 0.5,
  "filter_resonance": 0.5,
  "wave": "sine"
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
      state["wave"] = action.wave
      return state
    default:
      return state
  }
}
