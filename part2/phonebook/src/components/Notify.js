const Notify = ({ message, style }) => {
    if (message === null) {
      return null
    }

    const info = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }

    const error = {
        color: 'red',
        fontStyle: 'bold',
        fontSize: 16
    }
  
    
        switch (style) {
            default:
                return (<div></div>)
            case 'info':
                return (
                    <div style={info}>
                        {message}
                    </div>
                )
            case 'error':
                return (
                    <div style={error}>
                        {message}
                    </div>
                )
        }
    }

  export default Notify