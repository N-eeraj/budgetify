// component imports
import CreateFab from '@components/Dashboard/CreateFab'
import Budget from '@components/Dashboard/Budget'
import CreateDialog from '@components/Dashboard/CreateDialog'
import Create from '@components/Dashboard/Create'

// hooks imports
import useBudget from '@hooks/useBudget'

export default function Budgets() {
  const { handleCreate, ...createProps } = useBudget()

  return (
    <>
      <div>Budgets</div>
      <CreateFab
        tooltip="Create New Budget"
        Modal={CreateDialog}
        fields={<Create type="Budget" {...createProps} />}
        label="Create Budget"
        onSubmit={handleCreate} />
      <Budget />
    </>
  )
}
