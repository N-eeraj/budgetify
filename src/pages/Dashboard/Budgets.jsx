// material ui imports
import { Typography } from '@mui/material'

// component imports
import Budget from '@components/Dashboard/Budget'
import CreateFab from '@components/Dashboard/CreateFab'
import Create from '@components/Dashboard/Create'
import CreateDialog from '@components/Dashboard/CreateDialog'
import Confirmation from '@components/UI/Confirmation'

// hooks imports
import useBudget from '@hooks/useBudget'

export default function Budgets() {
  const {
    budgets,
    handleCreate,
    editingBudget, setEditingBudget,
    deletingBudget, setDeletingBudget,
    setName, setAmount,
    resetForm,
    ...formStates
  } = useBudget()

  const createProps = {
    setName,
    setAmount,
    ...formStates,
  }

  const handleDialogClose = () => {
    setEditingBudget(null)
    resetForm()
  }

  const handleEdit = id => {
    setEditingBudget(id)
    const { name, amount } = budgets.find(budget => budget.id === id)
    setName(name)
    setAmount(amount)
  }

  const handleUpdate = () => {
    console.log('updated')
  }

  const deleteBudget = () => {
    console.log(deletingBudget)
    setDeletingBudget(null)
  }

  return (
    <>
      { budgets.map(budget => (
        <Budget
          {...budget}
          onEdit={handleEdit}
          onDelete={id => setDeletingBudget(id)}
          key={budget.id} />
      )) }

      <CreateFab
        tooltip="Create New Budget"
        fields={<Create type="Budget" {...createProps} />}
        label="Create Budget"
        onClose={handleDialogClose}
        onSubmit={handleCreate} />

      <CreateDialog
        isUpdate
        label="Edit Budget"
        open={!!editingBudget}
        fields={<Create type="Budget" {...createProps} />}
        onClose={handleDialogClose}
        onSubmit={handleUpdate} />

      <Confirmation
        open={!!deletingBudget}
        title="Confirm Delete"
        actionText="Delete"
        onClose={() => setDeletingBudget(null)}
        onConfirm={deleteBudget}>
        <Typography>
          Are you sure you want to delete this budget & all its expenses ?
        </Typography>
      </Confirmation>
    </>
  )
}
