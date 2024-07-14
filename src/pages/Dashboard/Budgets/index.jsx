// material ui imports
import { Stack, Typography } from '@mui/material'

// react router imports
import { useParams, useNavigate } from 'react-router'

// material ui imports
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

// component imports
import BudgetCard from '@components/Dashboard/Budget'
import ExpenseList from '@components/Dashboard/Expense/List'
import BackNavigation from '@components/UI/BackNavigation'
import OptionsMenu from '@components/UI/OptionsMenu'
import Confirmation from '@components/UI/Confirmation'

// hooks imports
import useBudget from '@hooks/useBudget'

export default function Budget() {
  const {
    getBudget,
    getExpenses,
    deletingBudget,
    setDeletingBudget,
    deleteBudget,
  } = useBudget()

  const { id } = useParams()
  const navigate = useNavigate()

  const budgetDetails = getBudget(id)
  const expenses = getExpenses(id)

  const actions = [
    {
      text: 'New Expense',
      icon: <AddIcon />,
      onClick: () => navigate('/dashboard/expenses', { state: { budget: id } }),
    },
    {
      text: 'Edit',
      icon: <EditIcon />,
      onClick: () => navigate('/dashboard/budgets', { state: { id } }),
    },
    {
      text: 'Delete',
      icon: <DeleteIcon />,
      onClick: () => setDeletingBudget(id),
    },
  ]

  const handleDelete = () => {
    deleteBudget()
    navigate('/dashboard/budgets')
  }

  return (
    <>
      <Stack rowGap={3}>
        <Stack direction="row" justifyContent="space-between">
          <BackNavigation />
          <OptionsMenu actions={actions} />
        </Stack>

        <Stack rowGap={1}>
          <Typography variant="h5" component="h1" color="text.disabled">
            Budget Details
          </Typography>
          <BudgetCard {...budgetDetails} hasActions={false} />
        </Stack>

        <Stack>
          <Typography variant="h6" component="strong" color="text.disabled">
            Expenses
          </Typography>
          <ExpenseList expenses={expenses} />
        </Stack>
      </Stack>

      <Confirmation
        open={!!deletingBudget}
        title="Confirm Delete"
        actionText="Delete"
        onClose={() => setDeletingBudget(null)}
        onConfirm={handleDelete}>
        <Typography>
          Are you sure you want to delete this budget & all its expenses ?
        </Typography>
      </Confirmation>
    </>
  )
}
