import CountryDetails from './CountryDetails'
import Country from './Country'

const updateSelection = ( cca3, setSelection ) => {
    console.log(cca3)
    setSelection({cca3})
}

const Results = ({ countries, search, setSelection, selection }) => {

    const countriesToShow = selection !== null
    ? countries.filter(country => country.cca3 === selection.cca3)
    : countries.filter(country =>
        country.name.common.toLocaleLowerCase('fi').includes(search.toLocaleLowerCase('fi')))

    console.log(`got ${countriesToShow.length} countries to results`)
    if (countriesToShow.length <= 10 && countriesToShow.length > 1) {

        return (
            <div style={{whiteSpace: 'pre-wrap'}}>
                {countriesToShow.map(country => <Country key={country.cca3} country={country} updateSelection={() => updateSelection(country.cca3, setSelection)} />)}
            </div>
        )
    }
    else if (countriesToShow.length === 1) {
        return (
                <CountryDetails country={countriesToShow[0]} />
        )
    }
    else //if (countries.length > 10)
        return (
            <div><b>Too many results, please refine the search</b></div>
        )
}

export default ( Results )