import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleKey, changeOctave, keyDown, keyUp } from "../actions/index"
import RaisedButton from 'material-ui/RaisedButton'

import './keyboard.css'


// Keyboard Controller Component
class OnscreenKeyboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      down: false
    }
  }

  mouseDown(number) {
    this.props.keys.map((key) => {
      if(key.num === number) {
        this.props.toggleKey(key)
      }
    })
  }

  mouseUp(number) {
    this.props.keys.map((key) => {
      if(key.num === number) {
        this.props.toggleKey(key)
      }
    })
  }

  handleKeyDown(key) {
    this.setState({
      down: true
    }, () => this.props.keyDown(key))
  }

  handleKeyUp(key) {
    this.setState({
      down: false
    }, () => this.props.keyUp(key))
  }


  changeOctave(direction) {
    this.props.changeOctave(direction)
  }

  render() {

    window.addEventListener("keydown", (e) => {
      if(this.state.down) return;
      this.handleKeyDown(e.key)
    })

    window.addEventListener("keyup", (e) => {
      if(this.state.down) this.handleKeyUp(e.key)
      return
    })

    const self = this
    return (
      <div>
        <div>{(this.state.down) ? "true" : "false"}</div>
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
              <div>
                <span>{key.status}</span>
                <RaisedButton
                  key={key.num}
                  onMouseDown={(e) => this.mouseDown(key.num)}
                  onMouseUp={(e) => this.mouseUp(key.num)}
                  className={"key " + (key.status === "turning_on" ? 'down' : 'up')}
                  label={key.label}
                />
              </div>
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
    toggleKey: toggleKey,
    changeOctave: changeOctave,
    keyDown: keyDown,
    keyUp: keyUp
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OnscreenKeyboard)
