import { useState } from 'react'
import CountryDetails from './CountryDetails'
import Country from './Country'
import weatherService from '../services/Weather'

const updateSelection = ( country, setSelection, setWeather ) => {
    console.log(country.cca3)
    weatherService.getWeatherLatLong(
        country.capitalInfo.latlng[0]
        , country.capitalInfo.latlng[1])
        .then(capitolWeather => {
            setWeather(capitolWeather.current_weather)
            setSelection(country.cca3)
        })
}

const selectCountry = ( country, setWeather ) => {
    weatherService.getWeatherLatLong(
        country.capitalInfo.latlng[0]
        , country.capitalInfo.latlng[1])
        .then(capitolWeather => 
            setWeather(capitolWeather.current_weather))
}

const Results = ({ countries, search, setSelection, selection }) => {

    const countriesToShow = selection !== null
    ? countries.filter(country => country.cca3 === selection)
    : countries.filter(country =>
        country.name.common.toLocaleLowerCase('fi').includes(search.toLocaleLowerCase('fi')))

    const [weather, setWeather] = useState({})

    console.log(`got ${countriesToShow.length} countries to results and selection ${selection}`)
    if (countriesToShow.length <= 10 && countriesToShow.length > 1) {

        return (
            <div style={{whiteSpace: 'pre-wrap'}}>
                {countriesToShow.map(country => <Country key={country.cca3} country={country} updateSelection={() => updateSelection(country, setSelection, setWeather)} />)}
            </div>
        )
    }
    else if (countriesToShow.length === 1) {
        return (
                <CountryDetails country={countriesToShow[0]} weather={weather} selectCountry={() => selectCountry(countriesToShow[0], setWeather)} />
        )
    }
    else //if (countries.length > 10)
        return (
            <div><b>Too many results, please refine the search</b></div>
        )
}

export default ( Results )