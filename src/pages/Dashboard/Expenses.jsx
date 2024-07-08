// component imports
import CreateFab from '@components/Dashboard/CreateFab'
import ExpenseCard from '@components/Dashboard/Expense/Card'
import CreateDialog from '@components/Dashboard/CreateDialog'
import ExpenseCreate from '@components/Dashboard/Expense/Create'


export default function Expenses() {
  const handleCreate = () => {
    console.log()
  }

  return (
    <>
      <div>Expenses</div>
      <CreateFab
        tooltip="Create New Expense"
        Modal={CreateDialog}
        fields={<ExpenseCreate />}
        label="Create Expense"
        onSubmit={handleCreate} />
      <ExpenseCard />
    </>
  )
}
