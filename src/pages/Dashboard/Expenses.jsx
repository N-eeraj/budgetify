// component imports
import CreateFab from '@components/Dashboard/CreateFab'
import Expense from '@components/Dashboard/Expense'
import Create from '@components/Dashboard/Create'

// hooks imports
import useExpense from '@hooks/useExpense'

export default function Expenses() {
  const { handleCreate, ...createProps } = useExpense()

  return (
    <>
      <div>Expenses</div>
      <CreateFab
        tooltip="Create New Expense"
        fields={<Create type="Expense" {...createProps} />}
        label="Create Expense"
        onSubmit={handleCreate} />
      <Expense />
    </>
  )
}
