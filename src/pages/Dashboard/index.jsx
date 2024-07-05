// redux toolkit imports
import { useSelector } from 'react-redux'

// material ui imports
import { Stack, Typography } from '@mui/material'

// component imports
import ProfileMenu from '@components/ProfileMenu'
import GradientText from '@components/GradientText'

export default function Dashboard() {
  const userName = useSelector(({ main }) => main.user.name)

  return (
    <>
      <Stack alignItems="flex-end">
        <ProfileMenu />
      </Stack>
      <Stack direction="row" columnGap={1}>
        <Typography component="h1" color="text.secondary" sx={{ typography: { xs: 'h4', md: 'h3' } }}>
          Welcome
        </Typography>
        <GradientText text={userName} component="h1" sx={{ typography: { xs: 'h4', md: 'h3' } }} />
      </Stack>
    </>
  )
}
