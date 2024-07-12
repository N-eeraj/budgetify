// utils imports
import { getStorage, setStorage } from '@utils/localStorage'

const userId = () => getStorage('user')?.id
const allExpenses = getStorage('expenses', {})

export const userExpenses = () => getStorage('expenses', {})[getStorage('user')?.id] ?? []

export const setUserExpenses = expenseList => {
  const expenses = allExpenses
  expenses[userId()] = JSON.parse(JSON.stringify(expenseList))
  Object.entries(expenses).forEach(([key, value]) => {
    if (!value.length)
      delete expenses[key]
  })
  setStorage('expenses', expenses)
}

export const clearExpenses = () => {
  const remaining = Object.entries(allExpenses).reduce((remaining, [uuid, expenses]) => {
    if (uuid !== userId())
      remaining[uuid] = expenses
    return remaining
  }, {})
  setStorage('expenses', remaining)
}
