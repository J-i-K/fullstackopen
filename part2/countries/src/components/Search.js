import { useState } from 'react'
import Results from './Results'

const Search = ({ countries }) => {

    const [search, setSearch] = useState('')
    const [selection, setSelection] = useState(null)

    console.log('Search')
    // console.log(countries, search)

    const handleSearchChange = (event) => {
        console.log(event.target.value)
        setSearch(event.target.value)
        console.log(search)
        setSelection(null)
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
            <Results countries={countries} search={search} setSelection={setSelection} selection={selection} />
        </div>
    )
}

export default ( Search )