import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import Oscillator from './components/oscillator'
import WeatherRadar from './containers/weather-radar'
import OnscreenKeyboard from './components/keyboard'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Oscillator/>
        <WeatherRadar/>
        <OnscreenKeyboard/>
      </MuiThemeProvider>
    );
  }
}

export default App;
