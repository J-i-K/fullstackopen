import axios from 'axios'

const baseUrl = 'https://api.open-meteo.com/v1/'
console.log('WeatherService')

const getWeatherLatLong = ( lat, long ) => {
    console.log('getting weather')
    console.log(lat, long)
    const request = axios.get(baseUrl+'forecast', { params: {latitude: lat, longitude: long, current_weather: true, timezone: 'Europe/Helsinki', windspeed_unit: 'ms'}})
    return request.then(response => response.data)
    .catch(error => console.error(`Error getting data: ${error}!`))
}

export default { getWeatherLatLong }