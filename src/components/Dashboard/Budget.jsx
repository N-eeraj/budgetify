// react router imports
import { useNavigate } from 'react-router'

// material ui imports
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

// component imports
import ActionCard from '@components/UI/ActionCard'

// utils imports
import { formatAmount } from '@utils/formatter'

export default function BudgetCard({ id, name, amount, spent, onEdit, onDelete }) {
  const navigate = useNavigate()

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
    <ActionCard title={name} actions={actions} cardProps={{ variant: 'outlined' }}>
      { formatAmount(spent) }
      /
      { formatAmount(amount) }
    </ActionCard>
  )
}
