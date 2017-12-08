import axios from 'axios'

export function getWeather(zip) {
  const APIKEY = "e25edf705026ebe65407c261ae674b0b"
  var url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=${APIKEY}`
  axios.get(url)
    .then((response) => {
      if(response.status === 200) {
        let payload = {
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
        return payload
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
