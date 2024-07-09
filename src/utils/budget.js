// utils imports
import { getStorage, setStorage } from '@utils/localStorage'

const userId = getStorage('user').id
const allBudgets = getStorage('budgets', {})

export const userBudgets = allBudgets[userId] ?? []

export const setUserBudgets = budgetList => {
  const budgets = allBudgets
  budgets[userId] = budgetList
  setStorage('budgets', budgets)
}

export const clearBudgets = () => {
  const remaining = Object.entries(allBudgets).reduce((remaining, [uuid, budgets]) => {
    if (uuid !== userId)
      remaining[uuid] = budgets
    return remaining
  }, {})
}