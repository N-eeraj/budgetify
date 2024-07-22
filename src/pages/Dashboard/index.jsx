// react router imports
import { Outlet } from 'react-router'

// redux toolkit imports
import { useSelector } from 'react-redux'

// material ui imports
import { Box, Typography } from '@mui/material'

// component imports
import GradientText from '@components/UI/GradientText'
import Navbar from '@components/Dashboard/Navbar'
import DashboardTabs from '@components/Dashboard/Tabs'
import { SmallScreen } from '@components/Breakpoints'

export default function Dashboard() {
  const userName = useSelector(({ main }) => main.user.name)

  return (
    <>
      <Navbar />
      <Typography
        color="text.secondary"
        component="h1"
        sx={{ typography: { xs: 'h4', md: 'h3' } }}>
        Welcome
        <GradientText
          text={userName}
          component="span"
          marginLeft={1}
          sx={{ typography: { xs: 'h4', md: 'h3' } }} />
      </Typography>
      <SmallScreen>
        <DashboardTabs />
      </SmallScreen>
      <Outlet />
      <Box height={72} />
    </>
  )
}
