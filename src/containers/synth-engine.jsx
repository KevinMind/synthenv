import React, {Component} from 'react';
import { connect } from 'react-redux'

// ENGINE COMPONENT
class SynthEngine extends Component {

  constructor(props) {
    super(props)
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // create analyser
    this.analyser = this.audioCtx.createAnalyser();
    // set spectrum of analyser
    this.analyser.fftSize = 2048;
    // connect analyser to destination
    this.analyser.connect(this.audioCtx.destination);
    this.buffer = this.analyser.frequencyBinCount
    this.wavModel = new Uint8Array(this.buffer)
    this.freqModel = new Uint8Array(this.buffer)
    this.state = {
      voices: new Set()
    }
  }

  componentWillUnmount() {
    this.audioCtx.close();
  }


  noteNumberToFrequency(num) {
    // from https://github.com/danigb/midi-freq
    return Math.pow(2, (num - 69) / 12) * 440;
  }


  componentDidUpdate(props) {
    // create web audio api context
    // create Oscillator node
    for (let voice of this.state.voices) {
      voice.disconnect(this.audioCtx)
      this.state.voices.delete(voice)
    }
    this.props.keys.map((key) => {
      // if key is active, check if oscillator is already on, if not start it.
      if(key.active) {
        let osc = this.audioCtx.createOscillator()
        var gain = this.audioCtx.createGain();
        var dest = this.audioCtx.destination;
        // wire oscillator into analyser
        osc.connect(this.analyser);
        // wire analyser to gain
        this.analyser.connect(gain);
        // wire gain to destination
        gain.connect(dest);

        osc.type = 'triangle';
        gain.gain.value = 0.5;
        osc.frequency.value = this.noteNumberToFrequency(key.number); // value in hertz
        osc.name = key.number

        if(!this.state.voices.has(osc)) {
          osc.start()
          this.state.voices.add(osc)
          // output waveform data to wavModel state
          this.analyser.getByteFrequencyData(this.freqModel)
          this.analyser.getByteTimeDomainData(this.wavModel)
        }
      }
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
    keys: state.keys
  }
}

export default connect(mapStateToProps)(SynthEngine)
