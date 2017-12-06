import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import SynthEnv from './brasynth/synthenv'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <SynthEnv/>
      </MuiThemeProvider>
    );
  }
}

export default App;
