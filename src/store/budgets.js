// redux toolkit imports
import { createSlice } from '@reduxjs/toolkit'

// utils imports
import { userBudgets, setUserBudgets } from '@utils/budget'


export const budgetsSlice = createSlice({
  name: 'budgets',
  initialState: userBudgets,
  reducers: {
    createBudget: (state, action) => {
      const { name, amount } = action.payload
      const existingBudget = state.find(budget => budget.name === name)
      if (existingBudget)
        throw { name: 'A budget with this name exists' }
      let budget = +amount
      if (isNaN(budget))
        throw { amount: 'Amount should be a number' }
      if (budget <= 0)
        throw { amount: 'Amount should be greater than 0' }
      const id = crypto.randomUUID()
      const latestBudget = {
        id,
        name,
        amount: budget,
      }
      state.push(latestBudget)
      setUserBudgets(state)
      action.payload = latestBudget
    },
    updateBudget: (state, action) => {},
    deleteBudget: (state, action) => {},
  },
})

export const { createBudget, updateBudget, deleteBudget } = budgetsSlice.actions

export default budgetsSlice.reducer
