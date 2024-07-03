// redux toolkit & store imports
import { configureStore } from '@reduxjs/toolkit'
import mainReducer from '@store/main'
import usersReducer from '@store/users'

const store = configureStore({
  reducer: {
    main: mainReducer,
    users: usersReducer,
  },
})

export default store
