import React, {Component} from 'react';

import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { countUp } from '../actions/index'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import "./synthenv.css"

import Parameter from "./parameter"

class Oscillator extends Component{
  constructor(props) {
    super(props)

    this.state = {
      wave: "Sine",
      fequency: 440,
      volume: .5,
      active: true
    }
  }

  handleChange = (event, index, value) => {
    this.setState({
      wave: value
    });
  }

  toggleActive = (event, isChecked) => {
    this.setState({
      active: isChecked
    }, () => {
      if(this.state.active) {
        console.log(this.state)
      } else {
        console.log(this.state)
      }
    })
  }

  render() {

    const styles = {
      root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "flex-start",
        justifyContent: 'flex-start',
      },
    };
    const paperStyle = {
      display: "inline-block",
      padding: ".5rem"
    }

    return (
      <Paper
        zDepth={2}
        style={paperStyle}
      >
      <RaisedButton label={this.props.counter} onClick={this.props.countUp}></RaisedButton>
      <div style={styles.root}>
        <div>
          <h3>{this.props.name}</h3>
          <SelectField
            floatingLabelText="Wave"
            value={this.state.wave}
            onChange={this.handleChange}
          >
            <MenuItem value={"Sine"} primaryText="Sine" />
            <MenuItem value={"SawTooth"} primaryText="SawTooth" />
            <MenuItem value={"Square"} primaryText="Square" />
            <MenuItem value={"Triangle"} primaryText="Triangle" />
          </SelectField>
          <p>{this.state.active}</p>
          <Toggle
            label="Active"
            onToggle={this.toggleActive}
          />
      </div>
        <Parameter name="volume"/>
        <Parameter name="frequency"/>
      </div>
      </Paper>

    );
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({countUp: countUp}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Oscillator)
