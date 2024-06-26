import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode: 'dark',
  user: null,
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    toggleMode: state => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
    },
    setUser: (state, userDetails) => {
      state.user = userDetails
    }
  },
})

export const { toggleMode, setUser } = mainSlice.actions

export default mainSlice.reducer