import axios from 'axios'

export function countUp() {
    return {
      type: "INCREMENT"
    }
}

export function setWeather(data) {
  return {
    type: "SET_WEATHER_SUCCESS",
    data
  }
}

export function setWeatherAsync(zip) {
  return function (dispatch) {
    const APIKEY = "e25edf705026ebe65407c261ae674b0b"
    var url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=${APIKEY}`
    axios.get(url)
      .then((response) => {
        if(response.status === 200) {
            var data = {
              "status": "set",
              "cloud_cover": response.data.clouds.all,
              "min_temp": response.data.main.temp_min,
              "max_temp": response.data.main.temp_max,
              "avg_temp": response.data.main.temp,
              "air_pressure": response.data.main.pressure,
              "humidity": response.data.main.humidity,
              "visibility": response.data.visibility,
              "wind_speed": response.data.wind.wind_speed,
              "wind_deg": response.data.wind.wind_deg,
              "wind_gust": response.data.wind.wind_gust
            }
            dispatch(setWeather(data))
        }
      })
      .catch((error) => {
        console.log(error)
        return {
          type: "SET_WEATHER_FAILURE",
          zip
        }
      })

  };
}

export function mouseDown(keys) {
  return {
    type: 'NOTE_ON',
    keys
  }
}

export function mouseUp(keys) {
  return {
    type: 'NOTE_OFF',
    keys
  }
}
