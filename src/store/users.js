// redux toolkit imports
import { createSlice } from '@reduxjs/toolkit'

// utils imports
import { getStorage, setStorage } from '@utils/localStorage'

const initialState = getStorage('users', [])

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    createUser: (state, { payload }) => {
      const user = state.find(({ email }) => email === payload.email)
      if (user)
        throw { email: 'Email already used' }
      if (payload.name.length < 3)
        throw { name: 'Please enter a longer name' }
      if (payload.name.length > 20)
        throw { name: 'Please enter a shorter name' }
      if (payload.password.length < 6)
        throw { password: 'Please enter a longer password' }
      state.push(payload)
      setStorage('users', state)
    },
  },
})

export const { createUser } = usersSlice.actions

export default usersSlice.reducer
