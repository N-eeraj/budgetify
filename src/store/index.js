// redux toolkit & store imports
import { configureStore } from '@reduxjs/toolkit'
import mainReducer from '@store/main'

const store = configureStore({
  reducer: {
    main: mainReducer
  },
})

export default store
