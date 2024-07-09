// react imports
import { useState } from 'react'

// material ui imports
import { Card, CardContent, CardHeader, IconButton, Menu } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'

// component imports
import MenuItem from '@components/UI/MenuItem'

export default function ActionCard({ title, actions, children }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  return (
    <Card>
      <CardHeader
        title={title}
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
        { children }
      </CardContent>
    </Card>
  )
}
