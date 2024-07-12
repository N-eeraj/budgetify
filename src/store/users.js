// redux toolkit imports
import { createSlice } from '@reduxjs/toolkit'

// utils imports
import { getStorage, setStorage } from '@utils/localStorage'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: getStorage('users', []),
  },
  reducers: {
    createUser: (state, action) => {
      const { name, email, password } = action.payload
      const existingUser = state.data.find(user => user.email === email)
      if (existingUser)
        throw { email: 'Email already used' }
      if (name.length < 3)
        throw { name: 'Please enter a longer name' }
      if (name.length > 20)
        throw { name: 'Please enter a shorter name' }
      if (password.length < 6)
        throw { password: 'Please enter a longer password' }
      const id = crypto.randomUUID()
      const user = {
        id,
        ...action.payload,
      }
      state.data.push(user)
      setStorage('users', state.data)
      const { password: pswd, ...userDetails } = user
      action.payload = { id, ...userDetails }
    },
    updateUser: (state, action) => {
      const { id, password } = action.payload
      const userDetails = action.payload
      state.data = state.data.map(user => {
        if (user.id !== id) return user
        userDetails.password = password || user.password
        return userDetails
      })
      setStorage('users', state.data)
      action.payload = userDetails
    },
    deleteUser: (state, { payload }) => {
      state.data = state.data.filter(({ id }) => id !== payload)
      setStorage('users', state.data)
    },
  },
})

export const { createUser, updateUser, deleteUser } = usersSlice.actions

export const getUser = ({ data }) => (
  credentials => {
    const user = data.find(({ email }) => email === credentials.email)
    if (!user)
      throw { email: 'User not found' }
    if (user.password !== credentials.password)
      throw { password: 'Incorrect Password' }
    const { password, ...userDetails } = user
    return userDetails
  }
)

export default usersSlice.reducer
