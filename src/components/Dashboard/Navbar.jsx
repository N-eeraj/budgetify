// material ui imports
import { Stack } from '@mui/material'

// component imports
import ProfileMenu from '@components/Dashboard/Profile/Menu'
import DashboardTabs from '@components/Dashboard/Tabs'
import { LargeScreen } from '@components/Breakpoints'

export default function Navbar() {

  return (
    <Stack direction="row" justifyContent="flex-end" alignItems="center" columnGap={3}>
      <LargeScreen>
        <DashboardTabs />
      </LargeScreen>
      <ProfileMenu />
    </Stack>
  )
}
