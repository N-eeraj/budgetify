// redux toolkit imports
import { createSlice } from '@reduxjs/toolkit'

// utils imports
import { getStorage, setStorage, removeStorage } from '@utils/localStorage'

const initialState = {
  mode: getStorage('mode', 'dark'),
  user: getStorage('user'),
  toast: {
    show: false,
    type: null,
    text: null,
  },
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    toggleMode: state => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
      setStorage('mode', state.mode)
    },
    setUser: (state, { payload }) => {
      state.user = payload
      if (payload)
        setStorage('user', state.user)
      else
        removeStorage('user')
    },
    setProfilePicture: (state, action) => {
      if (action.payload === null)
        delete state.user.image
      else
        state.user.image = action.payload
      setStorage('user', state.user)
      action.payload = { ...state.user }
    },
    setToast: (state, { payload }) => {
      state.toast = payload ?? { show: false }
    },
  },
})

export const {
  toggleMode,
  setUser,
  setProfilePicture,
  setToast,
} = mainSlice.actions

export default mainSlice.reducer
