export default function(state= [], action) {
  switch(action.type) {
    case 'NOTE_ON':
      return Object.assign({}, state, {
        keys: action.keys
      })
    case 'NOTE_OFF':
      return Object.assign({}, state, {
        keys: action.keys
      })
    default:
      return state
  }
}
