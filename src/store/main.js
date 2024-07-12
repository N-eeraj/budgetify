// redux toolkit imports
import { createSlice } from '@reduxjs/toolkit'

// utils imports
import { getStorage, setStorage, removeStorage } from '@utils/localStorage'

const initialState = {
  mode: getStorage('mode', 'dark'),
  user: getStorage('user'),
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
  },
})

export const { toggleMode, setUser, setProfilePicture } = mainSlice.actions

export default mainSlice.reducer
