// redux toolkit & store imports
import { configureStore } from '@reduxjs/toolkit'
import mainReducer from '@store/main'
import usersReducer from '@store/users'
import budgetsReducer from '@store/budgets'
import expensesReducer from '@store/expenses'

const store = configureStore({
  reducer: {
    main: mainReducer,
    users: usersReducer,
    budgets: budgetsReducer,
    expenses: expensesReducer,
  },
})

export default store
