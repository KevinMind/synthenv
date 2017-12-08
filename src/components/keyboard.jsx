import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleKey, changeOctave } from "../actions/index"
import RaisedButton from 'material-ui/RaisedButton'

import './keyboard.css'


// Keyboard Controller Component
class OnscreenKeyboard extends Component {

  handleKeyPress = (event) => {
    console.log("hello")
  }

  mouseDown(number) {
    this.props.keys.map((key) => {
      if(key.number == number) {
        this.props.toggleKey(key)
      }
    })

  }

  mouseUp(number) {
    this.props.keys.map((key) => {
      if(key.number == number) {
        this.props.toggleKey(key)
      }
    })
  }

  changeOctave(direction) {
    this.props.changeOctave(direction)
  }

  render() {
    const self = this
    return (
      <div onKeyPress={() => this.handleKeyPress}>
        <div>
          <RaisedButton
            label="Oct -"
            onClick={() => this.changeOctave("down")}
          />
          <RaisedButton
            label="Oct +"
            onClick={() => this.changeOctave("up")}
          />
        </div>
        <div className="onscreen-keyboard">
          {self.props.keys.map((key) => {
            return (
              // Each Key looks like this.
              <RaisedButton
                key={key.number}
                onMouseDown={(e) => this.mouseDown(key.number)}
                onMouseUp={(e) => this.mouseUp(key.number)}
                className={"key " + (key.active ? 'down' : 'up')}
                label={key.label}
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
    keys: state.keys
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleKey: toggleKey,
    changeOctave: changeOctave
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OnscreenKeyboard)
