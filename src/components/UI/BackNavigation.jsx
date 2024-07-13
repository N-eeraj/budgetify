// react router imports
import { useNavigate } from 'react-router'

// material ui imports
import { IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function BackNavigation() {
  const navigate = useNavigate()

  return (
    <IconButton onClick={() => navigate(-1)}>
      <ArrowBackIcon />
    </IconButton>
  )
}
