import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setWeatherAsync } from '../actions/index'

/**
 * The input is used to create the `dataSource`, so the input always matches three entries.
 */
class WeatherRadar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      zip: ""
    }
  }

  handleUpdateInput = (event) => {
    this.setState({
      zip: event.target.value
    });
  };

  requestWeather = () => {
    let zip = this.state.zip
    this.props.setWeatherAsync(zip)
  }


  render() {
    return (
      <div>
        <p>{JSON.stringify(this.props.weather)}</p>
        <TextField
          hintText="Enter a zip code"
          onChange={this.handleUpdateInput}
        />
      <RaisedButton label="Get Weather" onClick={this.requestWeather} />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    weather: state.weather
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setWeatherAsync: setWeatherAsync}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherRadar)
