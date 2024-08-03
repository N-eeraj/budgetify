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

  const fallbackText = budgets?.length ? 'Create an expense and it will show here' : 'Create a budget to add an expense to it'

  return (
    <>
      <ExpenseList
        expenses={expenses}
        fallbackText={fallbackText} />

      { !!budgets?.length &&
        <CreateFab
          tooltip="Create New Expense"
          fields={<Create type="Expense" {...createProps} />}
          label="Create Expense"
          onClose={handleDialogClose}
          onSubmit={handleCreate} />
      }
    </>
  )
}
