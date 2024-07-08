// component imports
import CreateFab from '@components/Dashboard/CreateFab'
import Expense from '@components/Dashboard/Expense'
import CreateDialog from '@components/Dashboard/CreateDialog'
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
        Modal={CreateDialog}
        fields={<Create type="Expense" {...createProps} />}
        label="Create Expense"
        onSubmit={handleCreate} />
      <Expense />
    </>
  )
}
