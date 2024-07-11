// redux toolkit imports
import { useSelector } from 'react-redux'

// material ui imports
import { Avatar } from '@mui/material'

export default function ProfileAvatar({ sx, onClick, ...avatarProps }) {
  const { name, image } = useSelector(({ main }) => ({ ...main.user, mode: main.mode }))

  return (
    <Avatar
      src={image}
      alt={name}
      {...avatarProps}
      sx={{ cursor: 'pointer', ...sx }}
      onClick={onClick} />
  )
}
