const Notification = ({ message, isSuccess  }) => {
    console.log('Notification message:', message);
    console.log('Notification success:', isSuccess);
    
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