




var keyNames = [
    {
      note: "C",
      key: "a",
      status: "off"
    },
    {
      note: "C#",
      key: "w",
      status: "off"
    },
    {
      note: "D",
      key: "s",
      status: "off"
    },
    {
      note: "D#",
      key: "e",
      status: "off"
    },
    {
      note: "E",
      key: "d",
      status: "off"
    },
    {
      note: "F",
      key: "f",
      status: "off"
    },
    {
      note: "F#",
      key: "t",
      status: "off"
    },
    {
      note: "G",
      key: "g",
      status: "off"
    },
    {
      note: "G#",
      key: "y",
      status: "off"
    },
    {
      note: "A",
      key: "h",
      status: "off"
    },
    {
      note: "A#",
      key: "u",
      status: "off"
    },
    {
      note: "B",
      key: "j",
      status: "off"
    },
    {
      note: "C",
      key: "k",
      status: "off"
    }
]


// Generate keyboard with labels and number values
var initialState = {}
var keyList = []
var count = 36
keyNames.map((l) => {
  let key = {
    num: count,
    label: l.note,
    key: l.key,
    status: l.status,
    fired: false
  }
  keyList.push(key)
  count ++
})

initialState["keys"] = keyList


function keys(state = [], action) {
  switch(action.type) {
    case "START_NOTE":
      return state.map((key) => {
        if( key.key === action.key) {
          let newKey = {
            ...key,
            status: "turning_on"
          }
          return newKey
        }
        return key
      })
    case "STOP_NOTE":
      return state.map((key) => {
        if( key.key === action.key) {
          let newKey = {
            ...key,
            status: "turning_off"
          }
          return newKey
        }
        return key
      })
    default:
      return state
  }
}


export default function(state= initialState, action) {
  switch(action.type) {
    case "START_NOTE":
      return Object.assign({}, state, {
        keys: keys(state.keys, action)
      })
    case "STOP_NOTE":
      return Object.assign({}, state, {
        keys: keys(state.keys, action)
      })
    default:
      return state
      }
}
