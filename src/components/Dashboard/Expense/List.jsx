// component imports
import DashboardGrid from '@components/Dashboard/Grid'
import Expense from '@components/Dashboard/Expense'

export default function List({ expenses }) {
  return (
    <DashboardGrid items={expenses} Component={Expense} />
  )
}

