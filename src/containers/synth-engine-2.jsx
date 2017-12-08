import React { Component } from 'react';
import Immutable from 'immutable';
import ReactRedux from 'react-redux'
import Redux from 'redux';

var keyList = [
  {
    number: 48,
    label: 'C'
  },
  {
    number: 53,
    label: 'F'
  },
  {
    number: 55,
    label: 'G'
  }
];

// Keyboard Controller Component
class OnscreenKeyboard extends React.Component {
  render() {
    const {
      downKeys
    } = this.props;
    return (
      // Keyboard container
      <div
        className="onscreen-keyboard"
      >
        // programmatically generate keys
        {keyList.map(function(key) {
          return (
            // Each Key looks like this.
            <button
              key={key.number}
              onMouseDown={this.mouseDown.bind(this, key.number)}
              onMouseUp={this.mouseUp.bind(this, key.number)}
              className={downKeys.indexOf(key.number) !== -1 ? 'down' : ''}
            >
              {key.label}
            </button>
          );
          // I DON'T KNOW WHAT THIS DOES.
        }.bind(this))}
      </div>
    );
  }

  mouseDown(key) {
    this.props.dispatch({
      type: 'NOTE_ON',
      key
    });
  }

  mouseUp(key) {
    this.props.dispatch({
      type: 'NOTE_OFF',
      key
    });
  }
}


const ConnectedOnscreenKeyboard = ReactRedux.connect((store) => {
  return {
    downKeys: store.get('downKeys').toJS()
  };
})(OnscreenKeyboard);


// ENGINE COMPONENT
class SynthEngine extends React.Component {

  componentWillMount() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this._playingNotes = [];
  }

  componentWillUnmount() {
    this.audioContext.close();
  }

  componentWillReceiveProps(props) {
       if (props.events.length) {
         props.events
         .forEach(this.processEvent.bind(this));

       props.dispatch({
         type: "CLEAR_EVENT_QUEUE"
       });
    }

  }

  processEvent(event) {
    switch(event.type) {
      case 'NOTE_ON':
        // generates a new oscillator each time a note is played.
        var osc = this.audioContext.createOscillator();
        osc.frequency.value = this.noteNumberToFrequency(event.key);
        osc.start(this.audioContext.currentTime);
        osc.type = 'sine';
        osc.connect(this.audioContext.destination);
        this._playingNotes.push({
          key: event.key,
          osc
        })
        break;
      case 'NOTE_OFF':
        this._playingNotes.filter(note => {
          return note.key === event.key;
        }).forEach(note => {
          note.osc.stop(this.audioContext.currentTime);
        });
        break;
    }

  }

  render() {
    return null;
  }

  noteNumberToFrequency(num) {
    // from https://github.com/danigb/midi-freq
    return Math.pow(2, (num - 69) / 12) * 440;
  }
}
const ConnectedSynthEngine = ReactRedux.connect((store) => {
  return {
    events: store.get('events').toJS()
  };
})(SynthEngine);


class App extends React.Component {

  render() {
    return (<div>
      <div>
        Make sure your speakers/headphones are not too loud before pressing:
      </div>
      <ConnectedSynthEngine />
      <ConnectedOnscreenKeyboard />
    </div>);
  }
}


var initialState = Immutable.fromJS({
  downKeys: [],
  events: []
});

function reducer(state, action) {

  switch(action.type) {
    case 'NOTE_ON':
      return state.update('downKeys', downKeys => {
          return downKeys.push(action.key);
        }).update('events', events => {
          return events.push(action);
        })

    case 'NOTE_OFF':
      return state.update('downKeys', downKeys => {
          return downKeys.filter(downKey => {
            return downKey !== action.key;
          })
        })
        .update('events', events => {
          return events.push(action);
        });

    case 'CLEAR_EVENT_QUEUE':
      return state
        .set('events', new Immutable.List());

    default:
      return state;
  }
}

store = Redux.createStore(reducer, initialState);

ReactDOM.render(<ReactRedux.Provider
    store={store}
  >
    <App />
  </ReactRedux.Provider>,
  document.getElementById('app')
);
