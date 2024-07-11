// react router imports
import { useNavigate } from 'react-router'

// redux toolkit imports
import { useSelector } from 'react-redux'

// material ui imports
import { LinearProgress, Stack, Typography } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

// component imports
import ActionCard from '@components/UI/ActionCard'

// utils imports
import { formatAmount } from '@utils/formatter'

export default function BudgetCard({ id, name, amount, spent, onEdit, onDelete }) {
  const navigate = useNavigate()

  const { mode } = useSelector(({ main }) => main)

  const precentage = spent * 100 / amount
  let color
  if (precentage > 75)
    color = 'error'
  else if (precentage > 50)
    color = 'warning'

  const actions = [
    {
      text: 'View',
      icon: <VisibilityIcon />,
      onClick: () => navigate(`/dashboard/budget/${id}`),
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

  return (
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
            { formatAmount(spent) }
          </Stack>
          <Stack>
            <Typography>
              Remaining
            </Typography>
            { formatAmount(amount - spent) }
          </Stack>
        </Stack>
      </Stack>
    </ActionCard>
  )
}
