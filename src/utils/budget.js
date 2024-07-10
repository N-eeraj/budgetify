// utils imports
import { getStorage, setStorage } from '@utils/localStorage'

const userId = getStorage('user')?.id
const allBudgets = getStorage('budgets', {})

export const userBudgets = () => getStorage('budgets', {})[getStorage('user')?.id] ?? []

export const setUserBudgets = budgetList => {
  const budgets = allBudgets
  budgets[userId] = budgetList
  setStorage('budgets', budgets)
}

export const checkDuplicate = (budgets, name, id) => {
  const duplicateBudget = budgets.find(budget => budget.name === name && (id ? budget.id !== id : true))
  if (duplicateBudget)
    throw { name: 'A budget with this name exists' }
}

export const clearBudgets = () => {
  const remaining = Object.entries(allBudgets).reduce((remaining, [uuid, budgets]) => {
    if (uuid !== userId)
      remaining[uuid] = budgets
    return remaining
  }, {})
  setStorage('budgets', remaining)
}
