// react imports
import { useState } from 'react'

// react router imports
import { useNavigate } from 'react-router'

// material ui imports
import { Card, CardContent, CardHeader, IconButton, Menu } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VisibilityIcon from '@mui/icons-material/Visibility'

// component imports
import MenuItem from '@components/Dashboard/MenuItem'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

// utils imports
import { formatAmount } from '@utils/formatter'

export default function BudgetCard({ id, name, amount }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

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
    <Card>
      <CardHeader
        title={name}
        action={
          <IconButton onClick={({ currentTarget }) => setAnchorEl(currentTarget)}>
            <MoreVertIcon />
          </IconButton>
        }
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{ sx: { paddingY: 0, minWidth: '160px' } }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={() => setAnchorEl(null)}>
        { actions.map(item => <MenuItem {...item} key={item.text} />) }
      </Menu>
      <CardContent>
        {formatAmount(amount)}
      </CardContent>
    </Card>
  )
}
