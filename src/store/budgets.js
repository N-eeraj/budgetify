// redux toolkit imports
import { createSlice } from '@reduxjs/toolkit'

// utils imports
import {
  userBudgets,
  setUserBudgets,
  checkDuplicate,
} from '@utils/budget'
import { amountValidation } from '@utils/common'

export const budgetsSlice = createSlice({
  name: 'budgets',
  initialState: {
    data: [],
  },
  reducers: {
    setBudgets: state => {
      state.data = userBudgets()
    },
    createBudget: (state, action) => {
      const { name, amount } = action.payload
      checkDuplicate(state.data, name)
      const budget = amountValidation(amount)
      const id = crypto.randomUUID()
      const latestBudget = {
        id,
        name,
        amount: budget,
      }
      state.data.push(latestBudget)
      setUserBudgets(state.data)
      action.payload = latestBudget
    },
    updateBudget: (state, action) => {
      const { id, name, amount } = action.payload
      checkDuplicate(state.data, name, id)
      const budgetAmount = amountValidation(amount)
      state.data = state.data.map(budget => budget.id === id ? { id, name, amount: budgetAmount } : budget)
      setUserBudgets(state.data)
    },
    deleteBudget: (state, action) => {},
  },
})

export const { setBudgets, createBudget, updateBudget, deleteBudget } = budgetsSlice.actions

export default budgetsSlice.reducer
