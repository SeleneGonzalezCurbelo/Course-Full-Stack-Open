import '../App.css'

const Notification = ({ message, isSuccess  }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={isSuccess ? "MessageAdd" : "MessageError"}>
        {message}
      </div>
    )
  }

  export default Notification