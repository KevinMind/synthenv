var audioCtx = new AudioContext();
var analyser = audioCtx.createAnalyser();

var gainNode = audioCtx.createGain();
gainNode.name = "kevin";
gainNode.gain.value = 0.5;

var biquadFilter = audioCtx.createBiquadFilter();
biquadFilter.type = "lowpass";
biquadFilter.frequency.value = 2000;
biquadFilter.gain.value = .5;
biquadFilter.Q.value = 20;

// wire up post oscillator signal path
gainNode.connect(biquadFilter);
biquadFilter.connect(analyser);
biquadFilter.connect(audioCtx.destination);

var oscillators = [];

// ACTION: NOTE_OFF, NUM
function stop(num) {
//   find target oscillator
  let check = oscillators.filter((oscillator, index) => {
   if(oscillator.num == num) {
     oscillator.status = 'turning_off'
     refreshOscillators()
   }
  })
}

// ACTION: NOTE_ON, NUM
function start(num) {
//   if no oscillator, make one
  if(oscillators.filter(oscillator => oscillator.num == num).length < 1) {
    createOscillator(num);
  }
}

// ACTION: CREATE_OSC, NUM
function createOscillator(num) {
  //     generate oscillator
  let wave = document.getElementById("wave").value
  var oscillator = audioCtx.createOscillator();
  oscillator.num = num;
  oscillator.type = wave
  oscillator.status = "turning_on";

//   Wire up signal path
  oscillator.connect(gainNode);

  oscillator.frequency.value = keyToFreq(oscillator.num);
  oscillator.index = oscillators.length;
  oscillators.push(oscillator);
  refreshOscillators()
}

// REDUCER: REFRESH_OSCILLATORS
refreshOscillators() {
  console.log(oscillators)
  oscillators.map((oscillator) => {
    if(oscillator.status === "turning_on") {
      StartOscillator(oscillator)
    } else if (oscillator.status === "turning_off") {
      console.log(`turning_off ${oscillator.num}`)
      gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, .015)
      setTimeout(function() {
        console.log("turing it off")
        StopOscillator(oscillator)
      }, .5)

    } else {
      console.log(oscillator.status)
    }
  })
}

// ACTION: OSC_ON
StartOscillator(oscillator) {
  console.log(`turning_on ${oscillator.num}`)
  oscillator.start()
  oscillator.status = "on"
}

// ACTION: OSC_OFF
StopOscillator(oscillator) {
  let vol = (document.getElementById("volume").value / 100)
  console.log("execute")
  oscillator.stop()
  oscillator.status = "off"
  oscillators.splice(oscillators.indexOf(oscillator), 1)
  gainNode.gain.setTargetAtTime(vol, audioCtx.currentTime, .015)
}

// ACTION: OSC_MANUAL_ON
oscToggle() {
  let singleton = audioCtx.createOscillator();
  singleton.connect(gainNode)
  singleton.frequency.value = 440
  oscillators.push(singleton)
  singleton.start()
}

keyToFreq(key) {
  return Math.pow(2, (key - 69) / 12) * 440;
}


// CONTROL OSCILLATOR PARAMETERS
updateVolume(value) {
  let target = (value / 200) + .2
  gainNode.gain.setTargetAtTime(target, audioCtx.currentTime, 0.015);
}

updateFrequency(value) {
  oscillators.map((oscillator) => {
    oscillator.frequency.value = value
    console.log(oscillator.frequency.value)
  })
}

updateWave(value) {
  console.log(value)
  oscillators.map((oscillator) => {
    oscillator.type = value
  })
}

updateFilterType(value) {
  biquadFilter.type = value;
}

updateFilterCutoff(value) {
  biquadFilter.frequency.value = value * 100
}

updateFilterQ(value) {
  console.log(value)
  biquadFilter.Q.value = value
}

window.addEventListener("keydown", (e)=> {
  if(e.key === "a") {
    start(60)
  } else if(e.key === "d") {
    start(64)
  } else if(e.key === "g") {
    start(67)
  }
})
window.addEventListener("keyup", (e)=> {
  if(e.key === "a") {
    stop(60)
  } else if(e.key === "d") {
    stop(64)
  } else if(e.key === "g") {
    stop(67)
  }
})

soundUrls = [
  "rain_heavy.ogg",
  "rain_light.ogg",
  "rain_shower.ogg",
  "thunder.ogg",
  "wind-0-2.ogg",
  "wind-3-5.ogg",
  "wind-6-8.ogg",
  "wind-9-10.ogg"
]

var soundFiles = []

var boomBox = new (window.AudioContext || window.webkitAudioContext)();

// get individual sound file
function getSoundAsync(sound) {
  return new Promise((resolve, reject) => {
    var base = "https://s3.amazonaws.com/wav.synthenv.com/"
    ajaxRequest = new XMLHttpRequest();
    ajaxRequest.open('GET', base + sound, true);
    ajaxRequest.responseType = 'arraybuffer';
    ajaxRequest.onload = function() {
      let audioData = ajaxRequest.response;
      boomBox.decodeAudioData(audioData, function(buffer) {
        let soundSource = boomBox.createBufferSource();
        soundSource.name = sound
        soundSource.connect(boomBox.destination)
        soundSource.start()
        soundFiles.push(soundSource)
        resolve(soundSource)
      }, function(e){ reject(e) });
    }
    ajaxRequest.send();
  })
}

// chain soundfile gets
// soundUrls.reduce(function(p, item) {
//     return p.then(function() {
//         return getSoundAsync(item).then((response) => {
//           // do after each sound file is done being processed.
//         });
//     });
// }, Promise.resolve()).then(function(results) {
//     // all done here with array of results
//   soundFiles[0].start(0)
// });
getSoundAsync(soundUrls[0])
.then((response) => {
})

// ANALYSERNODE
analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);

var scopeCtx = document.getElementById('scope').getContext('2d');
var spectCtx = document.getElementById('spectrum').getContext('2d');

draw();

function draw() {
  drawSpectrum(analyser, spectCtx);
  drawScope(analyser, scopeCtx);

  requestAnimationFrame(draw);
}

function drawSpectrum(analyser, ctx) {
  var width = ctx.canvas.width;
  var height = ctx.canvas.height;
  var freqData = new Uint8Array(analyser.frequencyBinCount);
  var scaling = height / 256;

  analyser.getByteFrequencyData(freqData);

  ctx.fillStyle = 'rgba(0, 20, 0, 0.1)';
  ctx.fillRect(0, 0, width, height);

  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgb(0, 200, 0)';
  ctx.beginPath();

  for (var x = 0; x < width; x++)
    ctx.lineTo(x, height - freqData[x] * scaling);

  ctx.stroke();
}

function drawScope(analyser, ctx) {
  var width = ctx.canvas.width;
  var height = ctx.canvas.height;
  var timeData = new Uint8Array(analyser.frequencyBinCount);
  var scaling = height / 256;
  var risingEdge = 0;
  var edgeThreshold = 5;

  analyser.getByteTimeDomainData(timeData);

  ctx.fillStyle = 'rgba(0, 20, 0, 0.1)';
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
