// component imports
import CreateFab from '@components/Dashboard/CreateFab'
import Expense from '@components/Dashboard/Expense'
import Create from '@components/Dashboard/Create'

// hooks imports
import useExpense from '@hooks/useExpense'

export default function Expenses() {
  const { budgets, expenses, handleCreate, ...createProps } = useExpense()

  return (
    <>
    { expenses.map(expense => <Expense {...expense} key={expense.id} />) }

      { !!budgets.length && (
          <CreateFab
            tooltip="Create New Expense"
            fields={<Create type="Expense" {...createProps} budgets={budgets} />}
            label="Create Expense"
            onSubmit={handleCreate} />
      ) }
    </>
  )
}
