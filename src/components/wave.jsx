import React, { Component } from 'react'
import SelectField from 'material-ui/SelectField';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import { setWave } from '../actions/index'

class Wave extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value : "Sine"
    }
  }

  componentDidMount() {
    this.handleChange({}, 0, "sine")
  }

  handleChange = (event, index, value) => {
    console.log(value)
    this.setState({
      value: value
    }, ()=> {
      this.props.setWave(value)
    })
  }

  render () {
    return (
      <SelectField
        className="component_select"
        value={this.state.value}
        onChange={this.handleChange}
      >
        <MenuItem value="sine" primaryText="sine" />
        <MenuItem value="square" primaryText="square" />
        <MenuItem value="triangle" primaryText="triangle" />
        <MenuItem value="sawtooth" primaryText="sawtooth" />
      </SelectField>
    )
  }
}

function mapStateToProps(state) {
  return {
    keys: state.keys.keys
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setWave: setWave,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Wave)
