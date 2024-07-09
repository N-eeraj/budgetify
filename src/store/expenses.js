// redux toolkit imports
import { createSlice } from '@reduxjs/toolkit'

// utils imports
import { userExpenses } from '@utils/expense'


export const expensesSlice = createSlice({
  name: 'expenses',
  initialState: userExpenses,
  reducers: {
    createExpense: (state, action) => {},
    updateExpense: (state, action) => {},
    deleteExpense: (state, action) => {},
  },
})

export default expensesSlice.reducer
