// redux toolkit  imports
import { createSlice } from '@reduxjs/toolkit'

// utils imports
import { getStorage, setStorage } from '@utils/localStorage'

const initialState = {
  mode: getStorage('mode', 'light'),
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
    setUser: (state, userDetails) => {
      state.user = userDetails
      setStorage('user', state.user)
    }
  },
})

export const { toggleMode, setUser } = mainSlice.actions

export default mainSlice.reducer
