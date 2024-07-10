// material ui imports
import { Typography } from '@mui/material'

// component imports
import Expense from '@components/Dashboard/Expense'
import CreateFab from '@components/Dashboard/CreateFab'
import Create from '@components/Dashboard/Create'
import CreateDialog from '@components/Dashboard/CreateDialog'
import Confirmation from '@components/UI/Confirmation'

// hooks imports
import useExpense from '@hooks/useExpense'

export default function Expenses() {
  const {
    expenses,
    budgets,
    editingExpense,
    deletingExpense, setDeletingExpense,
    handleCreate,
    handleEdit,
    handleUpdate,
    deleteExpense,
    handleDialogClose,
    ...createProps
  } = useExpense()

  return (
    <>
    { expenses.map(expense => (
      <Expense
        {...expense}
        key={expense.id}
        onEdit={handleEdit}
        onDelete={id => setDeletingExpense(id)} />
    )) }

      { !!budgets.length && (
          <CreateFab
            tooltip="Create New Expense"
            fields={<Create type="Expense" {...createProps} budgets={budgets} />}
            label="Create Expense"
            onClose={handleDialogClose}
            onSubmit={handleCreate} />
      ) }

      <CreateDialog
        isUpdate
        label="Edit Expense"
        open={!!editingExpense}
        fields={<Create type="Expense" {...createProps} budgets={budgets} />}
        onClose={handleDialogClose}
        onSubmit={handleUpdate} />

      <Confirmation
        open={!!deletingExpense}
        title="Confirm Delete"
        actionText="Delete"
        onClose={() => setDeletingExpense(null)}
        onConfirm={deleteExpense}>
        <Typography>
          Are you sure you want to delete this expense ?
        </Typography>
      </Confirmation>
    </>
  )
}
