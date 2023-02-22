import Results from './Results'

const Search = ({ countries, search, setSearch }) => {

    console.log('Search')
    // console.log(countries, search)

    const handleSearchChange = (event) => {
        console.log(event.target.value)
        setSearch(event.target.value)
        console.log(search)
    }

    return (
        <div>
            <h1>All the countries in the world, search below:</h1>
            <div>
                Use to filter countries: <input
                value={search}
                onChange={handleSearchChange}
                />
            </div>
            <Results countries={countries} search={search} />
        </div>
    )
}

export default ( Search )