import '../App.css'
import PropTypes from 'prop-types'

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

  Notification.propTypes = {
    message: PropTypes.string.isRequired,
    isSuccess: PropTypes.bool.isRequired,
  }

  Notification.displayName = 'Notification'

  export default Notification