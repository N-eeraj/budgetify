// material ui imports
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

// component imports
import ActionCard from '@components/UI/ActionCard'

// utils imports
import { formatAmount } from '@utils/formatter'

export default function ExpenseCard({ id, name, amount, time, budget, onEdit, onDelete }) {

  const actions = [
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
    <ActionCard title={name} actions={actions}>
      <div>{ formatAmount(amount) }</div>
      <div>{ time }</div>
      <div>{ budget }</div>
    </ActionCard>
  )
}
