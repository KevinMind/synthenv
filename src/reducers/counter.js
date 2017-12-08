// Individual reducer manages state for some feature of the app

// accepts inputs from actions: executes state mutation from action.type and id and whatever else you throw it.

// outputs new state

export default function(state = 0, action) {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}
