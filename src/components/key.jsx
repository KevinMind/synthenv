import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import ReactDOM from 'react-dom';
import { toggleKey, changeOctave, keyDown, keyUp } from "../actions/index"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Key extends Component {
  constructor(props) {
    super(props)
    this.state = {
      down: false
    }
  }

  mouseDown(num) {
    this.props.toggleKey({
      num: num,
      position: "tunring_on"
    })
  }

  mouseUp(num) {
    this.props.toggleKey({
      num: num,
      position: "turning_off"
    })
  }

  toggleKey(key) {
    this.setState({
      down: !this.state.down
    }, () => {
    })
  }

  componentDidMount() {
  }

  render() {

    const keyStyle = {
      width: "20px",
      height: "20vh",
      margin: "5px",
      display: "block"
    }
    return (
        <RaisedButton
          num={this.props.num}
          label={this.props.label}
          onMouseDown={(e) => this.mouseDown(this.props.num)}
          onMouseUp={(e) => this.mouseUp(this.props.num)}
        />
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
