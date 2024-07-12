// redux toolkit imports
import { createSlice } from '@reduxjs/toolkit'

// utils imports
import { userExpenses, setUserExpenses } from '@utils/expense'
import { userBudgets } from '@utils/budget'

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    data: [],
  },
  reducers: {
    setExpenses: state => {
      state.data = userExpenses()
    },
    createExpense: (state, action) => {
      const { name, amount, budget } = action.payload
      const { amount: budgetAmount } = userBudgets().find(({ id }) => id === budget)
      const budgetSpent = state.data.reduce((total, expense) => {
        if (expense.budget === budget)
          total += expense.amount
        return total
      }, 0)
      const expense = +amount
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
      state.data.push(latestExpense)
      setUserExpenses(state.data)
      action.payload = latestExpense
    },
    updateExpense: (state, action) => {
      const { id, name, amount, budget } = action.payload
      const expenseAmount = +amount
      state.data = state.data.map(expense => expense.id === id ? { id, name, amount: expenseAmount, budget, time: expense.time } : expense)
      setUserExpenses(state.data)
    },
    removeExpense: (state, { payload }) => {
      state.data = state.data.filter(({ id }) => id !== payload)
      setUserExpenses(state.data)
    },
    removeExpensesByBudget: (state, { payload }) => {
      state.data = state.data.filter(({ budget }) => budget !== payload)
      setUserExpenses(state.data)
    },
  },
})

export const getExpensesByBudget = ({ data }, budget) => data.filter(expense => expense.budget === budget) ?? []

export const {
  setExpenses,
  createExpense,
  updateExpense,
  removeExpense,
  removeExpensesByBudget,
} = expensesSlice.actions

export default expensesSlice.reducer
