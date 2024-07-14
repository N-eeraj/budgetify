// material ui imports
import { Typography } from '@mui/material'

// component imports
import DashboardGrid from '@components/Dashboard/Grid'
import BudgetCard from '@components/Dashboard/Budget'
import CreateFab from '@components/Dashboard/Create/Fab'
import Create from '@components/Dashboard/Create'
import CreateDialog from '@components/Dashboard/Create/Dialog'
import Confirmation from '@components/UI/Confirmation'
import EmptyState from '@components/UI/EmptyState'

// hooks imports
import useBudget from '@hooks/useBudget'

// asset imports
import emptyImage from '@images/illustrations/budget.svg'

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
        Component={BudgetCard}
        emptyState={
          <EmptyState
            image={emptyImage}
            title="No Budgets"
            body="Click on the plus button to create a budget" />
        }
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
