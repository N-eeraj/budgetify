// react imports
import { useState } from 'react'

// material ui imports
import { Card, CardContent, CardHeader, IconButton, Menu } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'

// component imports
import MenuItem from '@components/UI/MenuItem'

export default function ActionCard({ title, actions, cardProps, children }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleItemClick = onClick => {
    onClick()
    setAnchorEl(null)
  }

  return (
    <Card {...cardProps}>
      <CardHeader
        title={title}
        titleTypographyProps={{
          variant: 'h5',
          component: 'h2',
        }}
        action={
          <IconButton onClick={({ currentTarget }) => setAnchorEl(currentTarget)}>
            <MoreVertIcon />
          </IconButton>
        }/>
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
        { actions.map(({ onClick, ...item }) => <MenuItem {...item} onClick={() => handleItemClick(onClick)} key={item.text} />) }
      </Menu>
      <CardContent sx={{ paddingY: 0 }}>
        { children }
      </CardContent>
    </Card>
  )
}
