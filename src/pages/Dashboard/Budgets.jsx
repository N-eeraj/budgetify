// component imports
import CreateFab from '@components/Dashboard/CreateFab'
import BudgetCard from '@components/Dashboard/Budget/Card'
import CreateDialog from '@components/Dashboard/CreateDialog'
import BudgetCreate from '@components/Dashboard/Budget/Create'

export default function Budgets() {
  const handleCreate = () => {
    console.log('hello')
  }

  return (
    <>
      <div>Budgets</div>
      <CreateFab
        tooltip="Create New Budget"
        Modal={CreateDialog}
        fields={<BudgetCreate />}
        label="Create Budget"
        onSubmit={handleCreate} />
      <BudgetCard />
    </>
  )
}
