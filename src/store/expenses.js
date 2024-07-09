// redux toolkit imports
import { createSlice } from '@reduxjs/toolkit'

// utils imports
import { userExpenses, setUserExpenses } from '@utils/expense'
import { userBudgets } from '@utils/budget'


export const expensesSlice = createSlice({
  name: 'expenses',
  initialState: userExpenses,
  reducers: {
    createExpense: (state, action) => {
      const { name, amount, budget } = action.payload
      const { amount: budgetAmount } = userBudgets.find(({ id }) => id === budget)
      const budgetSpent = state.reduce((total, expense) => {
        if (expense.budget === budget)
          total += expense.amount
        return total
      }, 0)
      let expense = +amount
      if (isNaN(expense))
        throw { amount: 'Amount should be a number' }
      if (expense <= 0)
        throw { amount: 'Amount should be greater than 0' }
      if (budgetAmount < budgetSpent + expense)
        throw { amount: 'Amount exceeds budget balance' }
      const id = crypto.randomUUID()
      const time = Date.now()
      const latestExpense = {
        id,
        time,
        name,
        amount: expense,
        budget,
      }
      state.push(latestExpense)
      setUserExpenses(state)
      action.payload = latestExpense
    },
    updateExpense: (state, action) => {},
    deleteExpense: (state, action) => {},
  },
})

export const { createExpense, updateExpense, deleteExpense } = expensesSlice.actions

export default expensesSlice.reducer
