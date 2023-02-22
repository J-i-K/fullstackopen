import { useState, useEffect } from 'react'
import countryService from './services/Countries'
import Search from './components/Search'

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selection, setSelection] = useState(null)

  useEffect(() => {
    console.log('effect')
    countryService
      .getCountries()
      .then(fetchedCountries => {
        setCountries(fetchedCountries)
        console.log(`Got ${fetchedCountries.length} countries`)
      })
  }, [])

  return (
    < Search countries={countries} search={search} setSearch={setSearch} setSelection={setSelection} selection={selection} />
  );
}

export default App;
