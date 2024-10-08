// react imports
import { useState } from 'react'

// react router imports
import { useNavigate } from 'react-router'

// redux toolkit imports
import { useDispatch, useSelector } from 'react-redux'
import {
  toggleMode,
  setUser,
  setToast,
} from '@store/main'

// material ui imports
import Menu from '@mui/material/Menu'
import PersonIcon from '@mui/icons-material/Person'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LogoutIcon from '@mui/icons-material/Logout'
import ShareIcon from '@mui/icons-material/Share'

// component imports
import ProfileAvatar from '@components/Dashboard/Profile/Avatar'
import MenuItem from '@components/UI/MenuItem'

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { mode } = useSelector(({ main }) => ({ ...main.user, mode: main.mode }))

  const menuItems = [
    {
      text: 'Profile',
      icon: <PersonIcon />,
      onClick: () => navigate('/dashboard/profile'),
    },
    {
      text: `${ mode === 'dark' ? 'Light' : 'Dark' } Mode`,
      icon: mode === 'dark' ? <WbSunnyIcon /> : <DarkModeIcon />,
      onClick: () => dispatch(toggleMode()),
    },
    {
      text: 'Share App',
      icon: <ShareIcon />,
      onClick: async () => {
        const url = location.origin
        if (navigator.share) {
            const shareData = {
              url,
              title: 'Budgetify Invitation',
              text: `Your friend is inviting you to try out the Budgetify expense tracking app.`,
            }
            await navigator.share(shareData)
        }
        else {
          navigator.clipboard.writeText(url)
          dispatch(setToast({
            show: true,
            type: 'info',
            text: 'Copied Invitation Link!',
          }))
        }
        setAnchorEl(null)
      },
    },
    {
      text: 'Logout',
      icon: <LogoutIcon />,
      onClick: () => dispatch(setUser()),
    },
  ]

  return (
    <>
      <ProfileAvatar onClick={({ currentTarget }) => setAnchorEl(currentTarget)} />

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
        { menuItems.map(item => <MenuItem {...item} key={item.text} />) }
      </Menu>
    </>
  )
}
