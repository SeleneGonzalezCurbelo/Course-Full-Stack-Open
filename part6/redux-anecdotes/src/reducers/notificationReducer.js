import { createSlice } from '@reduxjs/toolkit'

let timeoutId

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '', 
  reducers: {
    setNotificationMessage(state, action) {
        return action.payload 
    },
    clearNotification() {
        return ''
    },
  },
})

export const { setNotificationMessage, clearNotification } = notificationSlice.actions

export const setNotification = (message, durationInSeconds) => {
    return (dispatch) => {
      dispatch(setNotificationMessage(message))
  
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
  
      timeoutId = setTimeout(() => {
        dispatch(clearNotification())
      }, durationInSeconds * 1000)
    }
  }

export default notificationSlice.reducer
