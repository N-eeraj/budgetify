// reduct toolkit imports
import { useSelector } from 'react-redux'

// component imports
import CreateFab from '@components/Dashboard/CreateFab'
import Budget from '@components/Dashboard/Budget'
import Create from '@components/Dashboard/Create'

// hooks imports
import useBudget from '@hooks/useBudget'

export default function Budgets() {
  const { handleCreate, ...createProps } = useBudget()

  const budgets = useSelector(({ budgets }) => budgets)
  console.log(budgets)

  return (
    <>
      <div>Budgets</div>
      <CreateFab
        tooltip="Create New Budget"
        fields={<Create type="Budget" {...createProps} />}
        label="Create Budget"
        onSubmit={handleCreate} />
      <Budget />
    </>
  )
}
