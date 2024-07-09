// utils imports
import { getStorage, setStorage } from '@utils/localStorage'

const userId = getStorage('user')?.id
const allExpenses = getStorage('expenses', {})

export const userExpenses = allExpenses[userId] || []

export const setUserExpenses = expenseList => {
  const expenses = allExpenses
  expenses[userId] = expenseList
  setStorage('expenses', expenses)
}

export const clearExpenses = () => {
  const remaining = Object.entries(allExpenses).reduce((remaining, [uuid, expenses]) => {
    if (uuid !== userId)
      remaining[uuid] = expenses
    return remaining
  }, {})
  setStorage('expenses', remaining)
}
