import axios from 'axios'

const baseUrl = 'https://restcountries.com/v3.1/'
console.log('CountriesService')

const getCountries = () => {
    console.log('Getting countries')
    const request = axios.get(baseUrl+'all')
    return request.then(response => response.data)
    .catch(error => console.error(`Error getting data: ${error}!`))
}

const searchCountryByName = ( searchTerm ) => {
    const request = axios.get(baseUrl+'name/'+searchTerm)
    return request.then(response => response.data)
    .catch(error => console.error(`Error getting data: ${error}!`))
}

export default { getCountries, searchCountryByName }