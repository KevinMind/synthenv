// GENERATE KEYREFERENCE
var keyNames = [
    {
      note: "C",
      key: "a",
      status: "off",
      type: "white"
    },
    {
      note: "C#",
      key: "w",
      status: "off",
      type: "black"
    },
    {
      note: "D",
      key: "s",
      status: "off",
      type: "white"
    },
    {
      note: "D#",
      key: "e",
      status: "off",
      type: "black"
    },
    {
      note: "E",
      key: "d",
      status: "off",
      type: "white"
    },
    {
      note: "F",
      key: "f",
      status: "off",
      type: "white"
    },
    {
      note: "F#",
      key: "t",
      status: "off",
      type: "black"
    },
    {
      note: "G",
      key: "g",
      status: "off",
      type: "white"
    },
    {
      note: "G#",
      key: "y",
      status: "off",
      type: "black"
    },
    {
      note: "A",
      key: "h",
      status: "off",
      type: "white"
    },
    {
      note: "A#",
      key: "u",
      status: "off",
      type: "black"
    },
    {
      note: "B",
      key: "j",
      status: "off",
      type: "white"
    },
    {
      note: "C",
      key: "k",
      status: "off",
      type: "white"
    }
]


// GENERATE KEYBOARD WITH KEYREFERENCE
var initialState = {}
var keyList = []
var count = 60
keyNames.map((l) => {
  let key = {
    num: count,
    label: l.note,
    key: l.key,
    status: l.status,
    type: l.type,
    fired: false
  }
  keyList.push(key)
  count ++
})

initialState["keys"] = keyList


// STATE MUTATIONS
function keys(state = [], action) {
  switch(action.type) {
    case "TOGGLE_KEY":
      return state.map((key) => {
        if( key.num === action.payload.num) {
          let newKey = {
            ...key,
            status: action.payload.position
          }
          return newKey
        }
        return key
      })
      return state
    case "KEY_DOWN":
      return state.map((key) => {
        if( key.key === action.key && key.status === "off") {
          let newKey = {
            ...key,
            status: "turning_on"
          }
          return newKey
        }
        return key
      })
    case "KEY_UP":
      return state.map((key) => {
        if( key.key === action.key && key.status === "on") {
          let newKey = {
            ...key,
            status: "turning_off"
          }
          return newKey
        }
        console.log(key)
        return key
      })
    case "OSC_ON":
      return state.map((key) => {
        if(key.num === action.num) {
          return {
            ...key,
            status: "on"
          }
        }
        return key
      })
    case "OSC_OFF":
      return state.map((key) => {
        if(key.num === action.num) {
          return {
            ...key,
            status: "off"
          }
        }
        return key
      })
      // can only go up 5 and down
    case "CHANGE_OCTAVE":
      return state.map((key) => {
        if(action.direction === "down") {
          return {
            ...key,
            num: (key.num -12)
          }
        } else {
          return {
            ...key,
            num: (key.num +12)
          }
        }
      })
    default:
      return state
  }
}

// STATE REDUCERS
export default function(state= initialState, action) {
  switch(action.type) {
    case "TOGGLE_KEY":
      return Object.assign({}, state, {
        keys: keys(state.keys, action)
      })
    case "KEY_DOWN":
      return Object.assign({}, state, {
        keys: keys(state.keys, action)
      })
    case "KEY_UP":
      return Object.assign({}, state, {
        keys: keys(state.keys, action)
      })
    case "CHANGE_OCTAVE":
      return Object.assign({}, state, {
        keys: keys(state.keys, action)
      })
    case "OSC_ON":
      return Object.assign({}, state, {
        keys: keys(state.keys, action)
      })
    case "OSC_OFF":
      return Object.assign({}, state, {
        keys: keys(state.keys, action)
      })
    default:
      return state
      }
}
