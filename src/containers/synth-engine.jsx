import React, {Component} from 'react';
import { connect } from 'react-redux'

// ENGINE COMPONENT
class SynthEngine extends Component {

  constructor(props) {
    super(props)
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.gainNode = this.audioCtx.createGain();
    this.analyser = this.audioCtx.createAnalyser();
    this.biquadFilter = this.audioCtx.createBiquadFilter();

    this.biquadFilter.type = "lowpass";
    this.biquadFilter.frequency.value = 2000;
    this.biquadFilter.gain.value = .5;
    this.biquadFilter.Q.value = 20;

    this.analyser.fftSize = 2048;
    this.buffer = this.analyser.frequencyBinCount

    this.state = {
      oscillators: [],
      parameters: [],
      dataArray: new Uint8Array(this.buffer)
    }
  }

  componentWillMount() {
    // wire signal path
    this.gainNode.connect(this.biquadFilter)
    this.biquadFilter.connect(this.analyser)
    this.biquadFilter.connect(this.audioCtx.destination);
  }

  componentWillUnmount() {
    this.audioCtx.close();
  }

  noteNumberToFrequency(num) {
    // from https://github.com/danigb/midi-freq
    return Math.pow(2, (num - 69) / 12) * 440;
  }

  createOscillator(num) {
    let oscillator = this.audioCtx.createOscillator();
    oscillator.num = num;
    oscillator.type = "sine"
    oscillator.status = "turning_on";
    oscillator.frequency.value = this.noteNumberToFrequency(oscillator.num);
    oscillator.index = this.state.oscillators.length;

  //   Wire up signal path
    oscillator.connect(this.gainNode);
    let oscs = this.state.oscillators
    oscs.push(oscillator)
    this.setState({
      oscillators: oscs
    }, () => {
      this.refreshOscillators()
    })
  }

  refreshOscillators() {
    this.state.oscillators.map((oscillator) => {
      if(oscillator.status === "turning_on") {
        this.startOscillator(oscillator)
      } else if (oscillator.status === "turning_off") {
        console.log(`turning_off ${oscillator.num}`)
        this.gainNode.gain.setTargetAtTime(0, this.audioCtx.currentTime, .015)
        setTimeout(function() {
          this.stopOscillator(oscillator)
        }, .5)
      } else {
        console.log(oscillator.status)
      }
    })
  }

  startOscillator(oscillator) {
    // oscillator.start()
    oscillator.status = "on"
  }

  stopOscillator(oscillator) {
    // oscillator.stop()
    oscillator.status = "off"
    let oscs = this.state.oscillators
    oscs.splice(oscs.indexOf(oscillator), 1)
    this.setState({
      oscillators: oscs
    }, this.gainNode.gain.setTargetAtTime(.5, this.audioCtx.currentTime, .015))

  }


  componentWillReceiveProps() {
    this.gainNode.gain.setTargetAtTime(((this.props.parameters.volume/ 200)+ .2), this.audioCtx.currentTime, 0.015);
  }

  componentDidUpdate() {
    this.props.keys.map((key) => {
      if(key.status === "turning_on") this.createOscillator(key.num)
    })
  }

  render() {
    return (
      null
    )
  }
}

function mapStateToProps(state) {
  return {
    keys: state.keys.keys,
    parameters: state.parameters,

  }
}

export default connect(mapStateToProps)(SynthEngine)
