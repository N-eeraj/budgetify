// react router imports
import { useNavigate } from 'react-router'

// material ui imports
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function BackNavigation() {
  const navigate = useNavigate()

  return (
    <Tooltip title="Go Back" placement="right">
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton>
    </Tooltip>
  )
}
