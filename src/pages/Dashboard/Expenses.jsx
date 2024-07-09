// component imports
import CreateFab from '@components/Dashboard/CreateFab'
import Expense from '@components/Dashboard/Expense'
import Create from '@components/Dashboard/Create'

// hooks imports
import useExpense from '@hooks/useExpense'

export default function Expenses() {
  const { budgets, handleCreate, ...createProps } = useExpense()

  return (
    <>
      <div>Expenses</div>
      { !!budgets.length && (
          <CreateFab
            tooltip="Create New Expense"
            fields={<Create type="Expense" {...createProps} budgets={budgets} />}
            label="Create Expense"
            onSubmit={handleCreate} />
      ) }
      <Expense />
    </>
  )
}
