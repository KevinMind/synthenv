import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeOctave } from "../actions/index"

import './keyboard.css'
import Key from './key'
import Wave from './wave'

import RaisedButton from 'material-ui/RaisedButton'


// Keyboard Controller Component
class OnscreenKeyboard extends Component {


  changeOctave(direction) {
    this.props.changeOctave(direction)
  }

  render() {
    const self = this

    const keyboardStyle = {
      display: "flex",
      justifyContent: "flex-between",
      alignItems: "center",
      flexWrap: "wrap"
    }

    return (
      <div className="keyboard_container">
        <div className="keyboard_controls">
          <div className="control_component">
            <RaisedButton
              label="Oct -"
              onClick={() => this.changeOctave("down")}
            />
            <RaisedButton
              label="Oct +"
              onClick={() => this.changeOctave("up")}
            />
          </div>
          <div className="control_component">
            <Wave/>
          </div>
        </div>
        <div className="keyboard_keybed">
        {self.props.keys.map((key) => {
            return (
              // Each Key looks like this.
                <Key
                  key={key.num}
                  label={key.label}
                  num={key.num}
                  status={key.status}
                  type={key.type}
                />
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    keys: state.keys.keys
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeOctave: changeOctave,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OnscreenKeyboard)
