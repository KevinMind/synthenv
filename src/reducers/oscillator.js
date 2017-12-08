export default function(state = {}, action) {
  switch (action.type) {
    case "SET_VOLUME":
      console.log(action.volume)
      return state
    case "SET_FREQUENCY":
      console.log(action.frequency)
      return state
    default:
      return state
  }
}
