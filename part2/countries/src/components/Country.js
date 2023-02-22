const Country = ({ country, updateSelection }) => {
    return (
        <div>
            <p>
                {country.name.common} <button onClick={updateSelection} >select</button>
            </p>
        </div>
    )
}

export default ( Country )