// component imports
import DashboardGrid from '@components/Dashboard/Grid'
import Expense from '@components/Dashboard/Expense'
import EmptyState from '@components/UI/EmptyState'

// asset imports
import emptyImage from '@images/illustrations/expense.svg'

export default function List({ expenses, fallbackText }) {
  return (
    <DashboardGrid
      items={expenses.toReversed()}
      Component={Expense}
      emptyState={
        <EmptyState
          image={emptyImage}
          title="No Expenses"
          body={fallbackText} />
      } />
  )
}

