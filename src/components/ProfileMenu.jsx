// react imports
import { useState } from 'react'

// redux toolkit imports
import { useSelector } from 'react-redux'

// material ui imports
import { Avatar, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LogoutIcon from '@mui/icons-material/Logout'

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const { image, name, mode } = useSelector(({ main }) => ({ ...main.user, mode: main.mode }))

  return (
    <>
      <Avatar src={image} alt={name} sx={{ cursor: 'pointer' }} onClick={({ currentTarget }) => setAnchorEl(currentTarget)} />
      <Menu
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{ sx: { minWidth: '200px' } }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={() => setAnchorEl(null)}>
        <MenuItem>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText>
            Profile
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            { mode === 'dark' ? <WbSunnyIcon /> : <DarkModeIcon /> }
          </ListItemIcon>
          <ListItemText>
            Mode
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>
            Logout
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}
