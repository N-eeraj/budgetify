// utils imports
import { getStorage, setStorage } from '@utils/localStorage'

const userId = getStorage('user')?.id
const allExpenses = getStorage('budgets', {})

export const userExpenses = allExpenses[userId] || []
