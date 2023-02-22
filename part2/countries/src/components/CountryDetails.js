const CountryDetails = ({ country }) => {
    return (
        <div>
            <h1>
                {country.name.common}
            </h1>
            <div>
                Capital is {country.capital[0]}<br />
                Area is {country.area}
            </div>
            <div style={{whiteSpace: 'pre-wrap'}}>
                <h3>
                    Languages:
                </h3>
                {Object.values(country.languages).join('\n')}
            </div>
            <div><br /><img src={country.flags.png} /></div>
        </div>
    )
}

export default ( CountryDetails )