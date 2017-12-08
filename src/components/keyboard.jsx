import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mouseDown, mouseUp } from "../actions/index"
import RaisedButton from 'material-ui/RaisedButton'


// Keyboard Controller Component
class OnscreenKeyboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keys : [
        {
          number: 48,
          label: 'C',
          active: false
        },
        {
          number: 53,
          label: 'F',
          active: false
        },
        {
          number: 55,
          label: 'G',
          active: false
        }
      ]
    }
  }

  mouseDown(number) {
    let newKeys = this.state.keys
    newKeys.map((key) => {
      if(key.number == number) {
        key.active = true
      }
    }, this.props.mouseDown(this.state.keys))
  }

  mouseUp(number) {
    let newKeys = this.state.keys
    newKeys.map((key) => {
      if(key.number == number) {
        key.active = false
      }
    }, this.props.mouseUp(this.state.keys))
  }

  render() {
    const self = this
    return (
      <div>
        <p>Keys: {JSON.stringify(this.props.keys)}</p>
        <div className="onscreen-keyboard">
          {self.state.keys.map((key) => {
            return (
              // Each Key looks like this.
              <RaisedButton
                key={key.number}
                onMouseDown={(e) => this.mouseDown(key.number)}
                onMouseUp={(e) => this.mouseUp(key.number)}
                className="thingy"
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
  return bindActionCreators({mouseUp: mouseUp, mouseDown: mouseDown}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OnscreenKeyboard)
