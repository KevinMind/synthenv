import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import ReactDOM from 'react-dom';
import { toggleKey, changeOctave, keyDown, keyUp } from "../actions/index"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Key extends Component {

  mouseDown(num) {
    this.props.toggleKey({
      num: num,
      position: "turning_on"
    })
  }

  mouseUp(num) {
    this.props.toggleKey({
      num: num,
      position: "turning_off"
    })
  }

  handleTouch = (num, trig) => {
    if(trig == "on") {
      this.mouseDown(num)
      return
    }
    this.mouseUp(num)
  }

  render() {

    return (
        <div
          num={this.props.num}
          onMouseDown={(e) => this.mouseDown(this.props.num)}
          onMouseUp={(e) => this.mouseUp(this.props.num)}
          onTouchStart={this.handleTouch.bind(null, this.props.num, "on")}
          onTouchEnd={this.handleTouch.bind(null, this.props.num, "off")}
          className={"key " + (this.props.status === "on" ? 'down' : 'up') + " " + (this.props.type === "white" ? "white": "black")}
        >
        {this.props.label}
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
    toggleKey: toggleKey
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Key)
