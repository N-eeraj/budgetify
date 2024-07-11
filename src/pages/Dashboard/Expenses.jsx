// component imports
import ExpenseList from '@components/Dashboard/Expense/List'
import CreateFab from '@components/Dashboard/Create/Fab'
import Create from '@components/Dashboard/Create'

// hooks imports
import useExpense from '@hooks/useExpense'

export default function Expenses() {
  const {
    expenses,
    budgets,
    handleCreate,
    handleDialogClose,
    ...createProps
  } = useExpense()

  return (
    <>
      <ExpenseList expenses={expenses} />

      { !!budgets.length && (
          <CreateFab
            tooltip="Create New Expense"
            fields={<Create type="Expense" {...createProps} />}
            label="Create Expense"
            onClose={handleDialogClose}
            onSubmit={handleCreate} />
      ) }
    </>
  )
}
