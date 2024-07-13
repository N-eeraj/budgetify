// material ui imports
import { Typography } from '@mui/material'

// component imports
import DashboardGrid from '@components/Dashboard/Grid'
import Budget from '@components/Dashboard/Budget'
import CreateFab from '@components/Dashboard/Create/Fab'
import Create from '@components/Dashboard/Create'
import CreateDialog from '@components/Dashboard/Create/Dialog'
import Confirmation from '@components/UI/Confirmation'

// hooks imports
import useBudget from '@hooks/useBudget'

export default function BudgetList() {
  const {
    budgets,
    editingBudget,
    deletingBudget, setDeletingBudget,
    handleCreate,
    handleEdit,
    handleUpdate,
    deleteBudget,
    handleDialogClose,
    ...createProps
  } = useBudget()


  return (
    <>
      <DashboardGrid
        items={budgets}
        Component={Budget}
        onEdit={handleEdit}
        onDelete={id => setDeletingBudget(id)} />

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
