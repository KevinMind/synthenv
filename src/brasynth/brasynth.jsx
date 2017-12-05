import React, { Component } from 'react';


class Brasynth extends Component {

  constructor(props) {
    super(props)
    this.state = {
      audioSource: ""
    }
  }

  ComponentDidMount() {
  }


  render () {

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;

    var maxFreq = 6000;
    var maxVol = 1;

    var initialFreq = 440;
    var initialVol = 0.5;

    // set options for the oscillator

    oscillator.type = 'sine'; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
    oscillator.frequency.value = initialFreq; // value in hertz
    oscillator.start();

    gainNode.gain.value = initialVol;
    // Mouse pointer coordinates


    return (
      <h1>Hello there.</h1>
    );
  }
}


export default Brasynth;
