import axios from 'axios'

export function getWeather(zip) {
  const APIKEY = "e25edf705026ebe65407c261ae674b0b"
  var url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=${APIKEY}`
  axios.get(url)
    .then((response) => {
      if(response.status == 200) {
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

// Response
// {"coord":{"lon":139,"lat":35},
// "sys":{"country":"JP","sunrise":1369769524,"sunset":1369821049},
// "weather":[{"id":804,"main":"clouds","description":"overcast clouds","icon":"04n"}],
// "main":{"temp":289.5,"humidity":89,"pressure":1013,"temp_min":287.04,"temp_max":292.04},
// "wind":{"speed":7.31,"deg":187.002},
// "rain":{"3h":0},
// "clouds":{"all":92},
// "dt":1369824698,
// "id":1851632,
// "name":"Shuzenji",
// "cod":200}
