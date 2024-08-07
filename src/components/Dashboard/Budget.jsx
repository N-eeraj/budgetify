// react router imports
import { useNavigate } from 'react-router'

// redux toolkit imports
import { useSelector } from 'react-redux'

// material ui imports
import { LinearProgress, Stack, Typography } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

// component imports
import ActionCard from '@components/UI/ActionCard'

// utils imports
import { formatAmount } from '@utils/formatter'

export default function BudgetCard({ id, name, amount, spent, hasActions=true, onEdit, onDelete }) {
  const navigate = useNavigate()

  const { mode } = useSelector(({ main }) => main)

  const precentage = spent * 100 / amount
  let color
  if (precentage > 75)
    color = 'error'
  else if (precentage > 50)
    color = 'warning'

  let actions
  if (hasActions) {
    actions = [
      {
        text: 'View',
        icon: <VisibilityIcon />,
        onClick: () => navigate(`/dashboard/budget/${id}`),
      },
      {
        text: 'New Expense',
        icon: <AddIcon />,
        onClick: () => navigate('../expenses', { state: { budget: id } }),
      },
      {
        text: 'Edit',
        icon: <EditIcon />,
        onClick: () => onEdit(id),
      },
      {
        text: 'Delete',
        icon: <DeleteIcon />,
        onClick: () => onDelete(id),
      },
    ]
  }

  return (
    <ActionCard
      title={name}
      actions={actions}
      cardProps={{
        variant: mode === 'dark' ? 'filled' : 'outlined',
        sx: {
          backgroundColor: ({ palette }) => palette.primary.contrastText,
          borderRadius: 3,
        }
      }}>
      <Stack rowGap={1}>
        <Typography component="strong" variant="h6">
          Budget: { formatAmount(amount) }
        </Typography>
        <LinearProgress
          variant="determinate"
          value={precentage}
          color={color}
          sx={{
            height: 8,
            borderRadius: 1,
          }} />
        <Stack direction="row" justifyContent="space-between">
          <Stack>
            <Typography>
              Spent
            </Typography>
            <Typography>
              { formatAmount(spent) }
            </Typography>
          </Stack>
          <Stack>
            <Typography>
              Remaining
            </Typography>
            <Typography>
              { formatAmount(amount - spent) }
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </ActionCard>
  )
}
