import Country from './Country'

const Results = ({ countries, search }) => {

    const countriesToShow = search === ''
    ? []
    : countries.filter(country =>
        country.name.common.toLocaleLowerCase('fi').includes(search.toLocaleLowerCase('fi')))

    console.log(`got ${countriesToShow.length} countries to results`)
    if (countriesToShow.length <= 10 && countriesToShow.length > 1) {

        return (
            <div style={{whiteSpace: 'pre-wrap'}}>
                {countriesToShow.map(country => country.name.common).join('\n')}
            </div>
        )
    }
    else if (countriesToShow.length === 1) {
        return (
                <Country country={countriesToShow[0]} />
        )
    }
    else //if (countries.length > 10)
        return (
            <div><b>Too many results, please refine the search</b></div>
        )
}

export default ( Results )