import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton'
import {getWeather} from '../weatherApi/weatherApi'
import axios from 'axios'

/**
 * The input is used to create the `dataSource`, so the input always matches three entries.
 */
class SynthEnv extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      zipCode: "",
      data: {
        status: "not_set"
      }

    }
  }

  componentDidMount() {

  }

  apiCall = () => {
    var self = this
    let zip = this.state.zipCode
    const APIKEY = "e25edf705026ebe65407c261ae674b0b"
    var url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=${APIKEY}`
    axios.get(url)
      .then((response) => {
        if(response.status == 200) {
          self.setState({
            data: {
              "status": "set",
              "cloud_cover": response.data.clouds.all,
              "min_temp": response.data.main.temp_min,
              "max_temp": response.data.main.temp_max,
              "avg_temp": response.data.main.temp,
              "air_pressure": response.data.main.pressure,
              "humidity": response.data.main.humidity,
              "visibility": response.data.visibility,
              "text": response.data.weather[0].description,
              "wind_speed": response.data.wind.wind_speed,
              "wind_deg": response.data.wind.wind_deg,
              "wind_gust": response.data.wind.wind_gust
            }
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })

  }

  handleUpdateInput = (value) => {
    this.setState({
      dataSource: [
        value
      ],
      zipCode: value
    });
  };


  render() {
    console.log("did mount")
    // audio context
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();

    var maxFreq = 6000;
    var maxVol = 1;

    var initialFreq = 440;
    var initialVol = 0.5;

    var oscilloscope = <div id="oscilloscope"></div>

    // set options for the oscillator


    var analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);

    // Get a canvas defined with ID "oscilloscope"
    var canvas = oscilloscope
    console.log(canvas)
    var canvasCtx = canvas.getContext("2d");

    // draw an oscilloscope of the current audio source

    function draw() {
      console.log("drawing")
      var drawVisual = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = 'rgb(200, 200, 200)';
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

      canvasCtx.beginPath();

      var sliceWidth = canvas.width * 1.0 / bufferLength;
      var x = 0;

      for (var i = 0; i < bufferLength; i++) {

        var v = dataArray[i] / 128.0;
        var y = v * canvas.height / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    };

    draw();

    oscillator.type = 'sawtooth'; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
    oscillator.frequency.value = initialFreq; // value in hertz
    oscillator.start();

    gainNode.gain.value = initialVol;
    // Mouse pointer coordinates

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    return (
      <div>
        <audio controls>
          <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg"/>
        </audio>
        {oscilloscope}
        <div>
          <AutoComplete
            hintText="Enter a zip code"
            dataSource={this.state.dataSource}
            onUpdateInput={this.handleUpdateInput}
          />
        </div>
        <RaisedButton
          label="Get Weather"
          onClick={this.apiCall}
        />
      </div>
    );
  }
}

export default SynthEnv;
