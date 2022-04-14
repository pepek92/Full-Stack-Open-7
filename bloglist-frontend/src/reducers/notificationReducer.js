import { createSlice } from '@reduxjs/toolkit'

const NotificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
  },
})

let timeoutID = null

export const newNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(setNotification(message))

    if (timeoutID) {
      clearTimeout(timeoutID)
    }

    timeoutID = setTimeout(() => {
      dispatch(setNotification(null))
    }, time)
  }
}

export const { setNotification } = NotificationSlice.actions

export default NotificationSlice.reducer
