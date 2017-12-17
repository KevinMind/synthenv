import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';


import Oscillator from './components/oscillator'
import WeatherRadar from './containers/weather-radar'
import OnscreenKeyboard from './components/keyboard'
import SynthEngine from './containers/synth-engine'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)} style={{backgroundColor: "black"}}>
        <OnscreenKeyboard/>
        <SynthEngine/>
      </MuiThemeProvider>
    );
  }
}

export default App;
