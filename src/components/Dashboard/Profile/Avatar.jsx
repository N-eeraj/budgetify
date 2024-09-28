// redux toolkit imports
import { useSelector } from 'react-redux'

// material ui imports
import Avatar from '@mui/material/Avatar'

// utils imports
import profileImages from '@utils/profileImages'

export default function ProfileAvatar({ sx, onClick, ...avatarProps }) {
  const { name, image } = useSelector(({ main }) => main.user)

  return (
    <Avatar
      src={profileImages[image]}
      alt={name}
      {...avatarProps}
      sx={{ cursor: 'pointer', ...sx }}
      onClick={onClick} />
  )
}
