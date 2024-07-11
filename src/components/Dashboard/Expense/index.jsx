// material ui imports
import { Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

// component imports
import ActionCard from '@components/UI/ActionCard'
import CreateDialog from '@components/Dashboard/CreateDialog'
import Confirmation from '@components/UI/Confirmation'
import Create from '@components/Dashboard/Create'

// hooks imports
import useExpense from '@hooks/useExpense'

// utils imports
import { formatAmount } from '@utils/formatter'

export default function ExpenseCard({ id, name, amount, time, budgetName }) {
  const {
    editingExpense,
    deletingExpense, setDeletingExpense,
    handleEdit,
    handleUpdate,
    deleteExpense,
    handleDialogClose,
    ...createProps
  } = useExpense()

  const actions = [
    {
      text: 'Edit',
      icon: <EditIcon />,
      onClick: () => handleEdit(id),
    },
    {
      text: 'Delete',
      icon: <DeleteIcon />,
      onClick: () => setDeletingExpense(id),
    },
  ]

  return (
    <>
      <ActionCard title={name} actions={actions} cardProps={{ variant: 'outlined' }}>
        <div>{ formatAmount(amount) }</div>
        <div>{ time }</div>
        <div>{ budgetName }</div>
      </ActionCard>

      <CreateDialog
        isUpdate
        label="Edit Expense"
        open={!!editingExpense}
        fields={<Create type="Expense" {...createProps} />}
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
