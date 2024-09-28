// redux toolkit imports
import { createSlice } from '@reduxjs/toolkit'

// utils imports
import {
  userBudgets,
  setUserBudgets,
  checkDuplicate,
} from '@utils/budget'

export const budgetsSlice = createSlice({
  name: 'budgets',
  initialState: {
    data: null,
  },
  reducers: {
    setBudgets: state => {
      state.data = userBudgets()
    },
    createBudget: (state, action) => {
      const { name, amount } = action.payload
      checkDuplicate(state.data, name)
      const budget = +amount
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
    updateBudget: (state, { payload }) => {
      const { id, name, amount } = payload
      checkDuplicate(state.data, name, id)
      const budgetAmount = +amount
      state.data = state.data.map(budget => budget.id === id ? { id, name, amount: budgetAmount } : budget)
      setUserBudgets(state.data)
    },
    allocateFund: (state, { payload }) => {
      const { id, amount } = payload
      const allocation = +amount
      state.data = state.data.map(budget => budget.id === id ? { ...budget, amount: budget.amount + allocation } : budget)
      setUserBudgets(state.data)
    },
    removeBudget: (state, { payload }) => {
      state.data = state.data.filter(({ id }) => id !== payload)
      setUserBudgets(state.data)
    },
  },
})

export const getBudget = ({ data }, id) => data?.find(budget => budget.id === id)

export const {
  setBudgets,
  createBudget,
  updateBudget,
  allocateFund,
  removeBudget,
} = budgetsSlice.actions

export default budgetsSlice.reducer
