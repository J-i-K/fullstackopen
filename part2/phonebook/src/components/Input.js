const Input = ({ inputName, value, onChange }) => {
    return (
        <div>
          {inputName}: <input
                value={value}
                onChange={onChange}
                />
        </div>
    )
}

export default Input