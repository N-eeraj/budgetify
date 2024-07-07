// react router imports
import { Navigate, Outlet, useLocation } from 'react-router'

// redux toolkit imports
import { useSelector } from 'react-redux'

// material ui imports
import { Stack, Typography } from '@mui/material'

// component imports
import GradientText from '@components/GradientText'
import Navbar from '@components/Dashboard/Navbar'
import DashboardTabs from '@components/Dashboard/Tabs'
import { SmallScreen } from '@components/Breakpoints'

export default function Dashboard() {
  const { pathname } = useLocation()
  const tab = pathname.split('/').at(-1)
  console.log('hi')

  const userName = useSelector(({ main }) => main.user.name)

  return (
    <>
      <Navbar />
      <Stack direction="row" columnGap={1}>
        <Typography color="text.secondary" component="h1" sx={{ typography: { xs: 'h4', md: 'h3' } }}>
          Welcome
        </Typography>
        <GradientText text={userName} component="h1" sx={{ typography: { xs: 'h4', md: 'h3' } }} />
      </Stack>
      <SmallScreen>
        <DashboardTabs />
      </SmallScreen>
      <Outlet />
    </>
  )
}
