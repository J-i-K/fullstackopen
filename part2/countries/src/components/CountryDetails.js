import { useEffect } from 'react'
const CountryDetails = ({ country, weather, selectCountry }) => {
    console.log(`Weather type ${typeof weather}, and the weather ${weather}`)
    console.log(weather)

    useEffect(() => {
        console.log('effect')
        selectCountry()
      }, [country])

    return (
        <div>
            <h1>
                {country.name.common}
            </h1>
            <div>
                Capital is <b>{country.capital[0]}</b><br />
                Area is <b>{country.area}</b>
            </div>
            <div style={{whiteSpace: 'pre-wrap'}}>
                <h3>
                    Languages:
                </h3>
                {Object.values(country.languages).join('\n')}
            </div>
            <div><br /><img src={country.flags.png} /></div>
            <div>
                <h2>Weather in {country.capital[0]}</h2>
                Temperature is now {weather.temperature} &deg;C
                <br />Wind speed is {weather.windspeed} ms
            </div>
            <a href="https://open-meteo.com/">Weather data by Open-Meteo.com</a>
        </div>
    )
}

export default ( CountryDetails )