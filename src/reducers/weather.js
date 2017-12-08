export default function(state={}, action) {
    switch(action.type) {
      case "SET_WEATHER_SUCCESS":
        return Object.assign({}, state, {
          weather: action.data
      })
      case "SET_WEATHER_FAILURE":
        return Object.assign({}, state, {
          weather: "failed"
        })
      default:
        return state
    }
}
