// react router imports
import { Outlet, Navigate } from 'react-router'

// material ui imports
import { Container } from '@mui/material'

// hooks imports
import { useAuthenticated } from '@hooks/useAuthenticated'

export default function Dashboard() {
  const isAuthenticated = useAuthenticated()

  return (
    isAuthenticated ?
      <Container sx={{
        paddingX: {
          xs: 2,
          md: 0,
        },
        paddingY: {
          xs: 2,
          md: 3,
        },
      }}>
        <Outlet />
      </Container> :
      <Navigate to="/sign-in" />
  )
}
