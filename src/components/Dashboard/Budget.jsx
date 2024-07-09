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

export default function BudgetCard({ id, name, amount }) {
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
      onClick: () => alert('edit'),
    },
    {
      text: 'Delete',
      icon: <DeleteIcon />,
      onClick: () => alert('del'),
    },
  ]

  return (
    <ActionCard title={name} actions={actions}>
      { formatAmount(amount) }
    </ActionCard>
  )
}
