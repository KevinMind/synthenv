var keyNames = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#","A"]

var initialState = []
var count = 36
keyNames.map((l) => {
  let key = {
    number: count,
    label: l,
    active: false
  }
  initialState.push(key)
  count ++
})

export default function(state= initialState, action) {
  switch(action.type) {
    case 'TOGGLE_KEY':
      return state.map((key) => {
        if(key.number !== action.key.number) {
          return key
        }
        return {
           ...key,
           active: !key.active
        }
      })
    case "CHANGE_OCTAVE":
      if(action.direction == "up") {
        return state.map((key) => {
          return {
            ...key,
            number: (key.number + 12)
          }
        })
      } else {
        return state.map((key) => {
          return {
            ...key,
            number: (key.number - 12)
          }
        })
      }
    default:
      return state
  }
}
