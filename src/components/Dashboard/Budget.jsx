// react router imports
import { useNavigate } from 'react-router'

// redux toolkit imports
import { useSelector } from 'react-redux'

// material ui imports
import LinearProgress from '@mui/material/LinearProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import DeleteIcon from '@mui/icons-material/Delete'

// component imports
import ActionCard from '@components/UI/ActionCard'

// utils imports
import { formatAmount } from '@utils/formatter'

export default function BudgetCard({ id, name, amount, spent, hasActions=true, onAllocate, onEdit, onDelete, onClick }) {
  const navigate = useNavigate()

  const { mode } = useSelector(({ main }) => main)

  const percentage = spent * 100 / amount
  let color
  if (percentage > 75)
    color = 'error'
  else if (percentage > 50)
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
        text: 'New Allocation',
        icon: <MonetizationOnIcon />,
        onClick: () => onAllocate(id),
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
          cursor: onClick && 'pointer'
        },
        onClick: () => onClick && onClick(id)
      }}>
      <Stack rowGap={1}>
        <Typography component="strong" variant="h6">
          Budget: { formatAmount(amount) }
        </Typography>
        <LinearProgress
          variant="determinate"
          value={percentage}
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
