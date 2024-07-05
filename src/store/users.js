// redux toolkit imports
import { createSlice } from '@reduxjs/toolkit'

// utils imports
import { getStorage, setStorage } from '@utils/localStorage'

const initialState = getStorage('users', [])

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    createUser: (state, action) => {
      const existingUser = state.find(({ email }) => email === action.payload.email)
      if (existingUser)
        throw { email: 'Email already used' }
      if (action.payload.name.length < 3)
        throw { name: 'Please enter a longer name' }
      if (action.payload.name.length > 20)
        throw { name: 'Please enter a shorter name' }
      if (action.payload.password.length < 6)
        throw { password: 'Please enter a longer password' }
      const id = crypto.randomUUID()
      const user = {
        id,
        ...action.payload,
      }
      state.push(user)
      setStorage('users', state)
      const { password, ...userDetails } = user
      action.payload = { id, ...userDetails }
    },
  },
})

export const { createUser } = usersSlice.actions

export const getUser = state => (
  credentials => {
    const user = state.find(({ email }) => email === credentials.email)
    if (!user)
      throw { email: 'User not found' }
    if (user.password !== credentials.password)
      throw { password: 'Incorrect Password' }
    const { password, ...userDetails } = user
    return userDetails
  }
)

export default usersSlice.reducer