// react router imports
import { useNavigate } from 'react-router'

// redux toolkit imports
import { useSelector } from 'react-redux'

// material ui imports
import { Chip, Grid, Typography } from '@mui/material'
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
import { formatAmount, formatDate } from '@utils/formatter'

export default function ExpenseCard({ id, name, amount, time: timeStamp, budget, budgetName }) {
  const {
    editingExpense,
    deletingExpense, setDeletingExpense,
    handleEdit,
    handleUpdate,
    deleteExpense,
    handleDialogClose,
    ...createProps
  } = useExpense()

  const navigate = useNavigate()

  const { mode } = useSelector(({ main }) => main)

  const { date, time} = formatDate(timeStamp)

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
      <ActionCard
        title={name}
        actions={actions}
        cardProps={{
        variant: mode === 'dark' ? 'filled' : 'outlined',
          sx: {
            borderRadius: 3,
            backgroundColor: ({ palette }) => palette.primary.contrastText,
          }
        }}>
        <Grid container>
          <Grid item xs={6}>
          <Chip
            label={budgetName}
            color="primary"
            size="small"
            sx={{ paddingX: 1 }}
            onClick={() => navigate(`/dashboard/budget/${budget}`)} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" align="right" color="error">
            { formatAmount(amount) }
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="body2"
              component="span"
              noWrap
              sx={{
                color: ({ palette }) => palette.text[palette.mode === 'dark' ? 'disabled' : 'secondary']
              }}>
              { date }, { time }
            </Typography>
          </Grid>
        </Grid>
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
