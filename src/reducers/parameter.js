var initialState = {
  "volume": 0.5,
  "cutoff": 0.5,
  "resonance": 0.5,
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

function param(state, action) {
  return action.payload.value
}

export default function(state=initialState, action) {
  switch (action.type) {
    case "SET_VOLUME":
      return Object.assign({}, state, {
        volume: param(state, action)
      })
    case "SET_CUTOFF":
      return Object.assign({}, state, {
        cutoff: param(state, action)
      })
    case "SET_RESONANCE":
      return Object.assign({}, state, {
        resonance: param(state, action)
      })
    case "SET_WAVE":
      return Object.assign({}, state, {
        wave: wave(state.wave, action)
      })
    default:
      return state
  }
}
