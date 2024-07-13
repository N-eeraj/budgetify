// material ui imports
import { Stack } from '@mui/material'

// component imports
import ProfilePicture from '@components/Dashboard/Profile/Picture'
import ProfileForm from '@components/Dashboard/Profile/Form'
import BackNavigation from '@components/UI/BackNavigation'

export default function Profile() {
  return (
    <>
      <BackNavigation />

      <Stack alignItems="center" width={1}>
        <ProfilePicture />
        <ProfileForm />
      </Stack>
    </>
  )
}
