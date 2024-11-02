const notificationReducer = (state, action) => {
    switch (action.type) {
        case "SET_NOTIFICATION":
            return action.payload
        case "CLEAR_NOTIFICATION":
            return ''
        default:
            return state
    }
  }

export default notificationReducer