import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import Oscillator from './components/oscillator'
import WeatherRadar from './containers/weather-radar'
import OnscreenKeyboard from './components/keyboard'
import SynthEngine from './containers/synth-engine'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Oscillator/>
        <WeatherRadar/>
        <OnscreenKeyboard/>
        <SynthEngine/>
      </MuiThemeProvider>
    );
  }
}

export default App;
