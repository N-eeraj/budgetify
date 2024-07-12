// react router imports
import { useNavigate } from 'react-router'

// material ui imports
import { Stack, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

// component imports
import ProfilePicture from '@components/Dashboard/Profile/Picture'
import ProfileForm from '@components/Dashboard/Profile/Form'

export default function Profile() {
  const navigate = useNavigate()

  return (
    <>
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton>

      <Stack alignItems="center" width={1}>
        <ProfilePicture />
        <ProfileForm />
      </Stack>
    </>
  )
}
