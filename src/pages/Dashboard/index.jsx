// redux toolkit imports
import { useSelector } from 'react-redux'

// material ui imports
import { Stack, Typography } from '@mui/material'

// component imports
import ProfileMenu from '@component/ProfileMenu'

export default function Dashboard() {
  const userName = useSelector(({ main }) => main.user.name)

  return (
    <>
      <Stack alignItems="flex-end">
        <ProfileMenu />
      </Stack>
      <Typography component="h1" sx={{ typography: { xs: 'h4', md: 'h3' } }}>
        Welcome { userName }
      </Typography>
    </>
  )
}
