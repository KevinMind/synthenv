import React, { Component } from 'react';

import Slider from 'material-ui/Slider'
import "./synthenv.css"

class Parameter extends Component {
    constructor(props) {
      super(props)
      this.state = {
        value: .5,
        axis: "y"
      }
    }

    handleUpdate = (event, newNumber) => {
      this.setState({
        value: newNumber
      })
    }

    render () {

      const labelStyle = {

      }
      const valueStyle = {
        padding: ".1rem",
        border: "2px solid rgb(189,189,189)",
        background: "#e0e0e0"
      }
      return (
        <div className="parameter">
          <Slider
            style={{height: 120}}
            axis={this.state.axis}
            defaultValue={this.state.value}
            onChange={this.handleUpdate}
            />
          <p style={labelStyle}>{this.props.name}</p>
          <p style={valueStyle}>{this.state.value}</p>
        </div>
      );
    }
}

export default Parameter
