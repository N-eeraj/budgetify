// react imports
import { useState } from 'react'

// react router imports
import { useNavigate } from 'react-router'

// redux toolkit imports
import { useDispatch, useSelector } from 'react-redux'
import { toggleMode, setUser } from '@store/main'

// material ui imports
import { Avatar, Menu } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LogoutIcon from '@mui/icons-material/Logout'

// component imports
import ProfileMenuItem from '@component/ProfileMenu/Item'

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { image, name, mode } = useSelector(({ main }) => ({ ...main.user, mode: main.mode }))

  const modeIcon = mode === 'dark' ? <WbSunnyIcon /> : <DarkModeIcon />

  return (
    <>
      <Avatar
        src={image}
        alt={name}
        sx={{ cursor: 'pointer' }}
        onClick={({ currentTarget }) => setAnchorEl(currentTarget)} />
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
        <ProfileMenuItem text="Profile" icon={<PersonIcon />} onClick={() => navigate('/dashboard/profile')} />
        <ProfileMenuItem text="Mode" icon={modeIcon} onClick={() => dispatch(toggleMode())} />
        <ProfileMenuItem text="Logout" icon={<LogoutIcon />} onClick={() => dispatch(setUser())} />
      </Menu>
    </>
  )
}
