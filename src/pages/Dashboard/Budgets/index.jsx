// material ui imports
import { Stack, Typography } from '@mui/material'

// react router imports
import { useParams, useNavigate } from 'react-router'

// material ui imports
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

// component imports
import BackNavigation from '@components/UI/BackNavigation'
import OptionsMenu from '@components/UI/OptionsMenu'
import Confirmation from '@components/UI/Confirmation'

// hooks imports
import useBudget from '@hooks/useBudget'

export default function Budget() {
  const {
    deletingBudget,
    setDeletingBudget,
    deleteBudget,
  } = useBudget()

  const { id } = useParams()
  const navigate = useNavigate()

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
      <Stack direction="row" justifyContent="space-between">
        <BackNavigation />
        <OptionsMenu actions={actions} />
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
