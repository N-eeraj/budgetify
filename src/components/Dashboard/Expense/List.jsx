// component imports
import Expense from '@components/Dashboard/Expense'

export default function List({ expenses }) {
  return (
    expenses.map(expense => <Expense {...expense} key={expense.id} />)
  )
}

