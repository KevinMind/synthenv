import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { oscOn, oscOff } from '../actions/index';
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
    this.feqData = new Uint8Array(this.buffer)

    this.state = {
      oscillators: [],
      parameters: [],
      dataArray: new Uint8Array(this.buffer)
    }

    this.drawScope = this.drawScope.bind(this)
    this.drawSpectrum = this.drawSpectrum.bind(this)
    this.draw = this.draw.bind(this)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
  }

  componentWillMount() {
    // wire signal path
    this.gainNode.connect(this.biquadFilter)
    this.biquadFilter.connect(this.analyser)
    this.biquadFilter.connect(this.audioCtx.destination);
  }

  componentDidMount() {
    // LISTEN FOR KEYUP AND KEYDOWN EVENTS
    window.addEventListener('keyup', (e) => {
      console.log(`${e.key} keyup`)
    })

    window.addEventListener('keydown', (e) => {
      console.log(`${e.key} keydown`)
    })
  }

  componentWillUnmount() {
    this.audioCtx.close();
  }

  noteNumberToFrequency(num) {
    // from https://github.com/danigb/midi-freq
    return Math.pow(2, (num - 69) / 12) * 440;
  }

  start(num) {
    var self = this;
    // current oscillators
    let oscs = this.state.oscillators

    // if no oscillator registered for key, make one.
    if(oscs.filter(oscillator => oscillator.num == num).length < 1) {
      this.createOscillator(num);
    }
  }

  stop(num) {
    this.gainNode.gain.setTargetAtTime(0, this.audioCtx.currentTime, .015)
    var self = this;

    setTimeout(function(){
      // find target oscillator
      self.state.oscillators.filter((oscillator, index) => {
       if(oscillator.num == num) {
         oscillator.status = 'turning_off'
         self.refreshOscillators()
       }
      })
    }, 75)
  }

  createOscillator(num) {
    let oscs = this.state.oscillators
    let oscillator = this.audioCtx.createOscillator();
    oscillator.num = num;
    oscillator.type = "sine"
    oscillator.status = "turning_on";
    oscillator.index = this.state.oscillators.length;

    // set frequency: need to update to .setTargetAtTime
    oscillator.frequency.value = this.noteNumberToFrequency(oscillator.num);

    // Wire up signal path
    oscillator.connect(this.gainNode);
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
        this.stopOscillator(oscillator)
      } else {
        console.log(oscillator.status)
      }
    })
  }

  startOscillator(oscillator) {
    // oscillator.start()
    oscillator.start()
    oscillator.status = "on"
    this.props.oscOn(oscillator.num)
  }

  stopOscillator(oscillator) {
    oscillator.stop()
    let oscs = this.state.oscillators
    oscs.splice(oscs.indexOf(oscillator), 1)
    oscillator.status = "off"
    this.setState({
      oscillators: oscs
    }, () => {
      this.props.oscOff(oscillator.num)
    })
  }


  componentWillReceiveProps() {
    this.gainNode.gain.setTargetAtTime(((this.props.parameters.volume/ 200)+ .2), this.audioCtx.currentTime, 0.015);
  }

  componentDidUpdate() {

    this.scopeCtx = this.refs.canvasScope.getContext('2d')
    this.spectCtx = this.refs.canvasSpect.getContext('2d')

    var bufferLength = this.analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteTimeDomainData(dataArray);

    this.draw()

    this.props.keys.map((key) => {
      if(key.status === "turning_on") {
        this.start(key.num)
      } else if (key.status === "turning_off") {
        this.stop(key.num)
      }
    })
  }

  drawScope() {
    var ctx = this.scopeCtx
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var timeData = new Uint8Array(this.analyser.frequencyBinCount);
    var scaling = height / 256;
    var risingEdge = 0;
    var edgeThreshold = 5;

    this.analyser.getByteTimeDomainData(timeData);

    ctx.fillStyle = 'rgba(0, 0, 0)';
    ctx.fillRect(0, 0, width, height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(0, 200, 0)';
    ctx.beginPath();

    // No buffer overrun protection
    while (timeData[risingEdge++] - 128 > 0 && risingEdge <= width);
    if (risingEdge >= width) risingEdge = 0;

    while (timeData[risingEdge++] - 128 < edgeThreshold && risingEdge <= width);
    if (risingEdge >= width) risingEdge = 0;

    for (var x = risingEdge; x < timeData.length && x - risingEdge < width; x++)
      ctx.lineTo(x - risingEdge, height - timeData[x] * scaling);

    ctx.stroke();
  }

  drawSpectrum() {
    var ctx = this.spectCtx
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var freqData = new Uint8Array(this.analyser.frequencyBinCount);
    var scaling = height / 256;

    this.analyser.getByteFrequencyData(freqData);
    ctx.fillStyle = 'rgba(0, 20, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(0, 200, 0)';
    ctx.beginPath();

    for (var x = 0; x < width; x++)
      ctx.lineTo(x, height - freqData[x] * scaling);
    ctx.stroke();
  }

  draw(scopeCtx) {
    this.drawScope()
    this.drawSpectrum()
    requestAnimationFrame(this.draw)
  }

  render() {

    return (
      <div>
        <canvas id="scope" ref="canvasScope"/>
        <canvas id="spectrum" ref="canvasSpect"/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    keys: state.keys.keys,
    parameters: state.parameters,

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    oscOn: oscOn,
    oscOff: oscOff
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(SynthEngine)
