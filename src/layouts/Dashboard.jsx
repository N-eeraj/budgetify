// react router imports
import { Outlet, Navigate } from 'react-router'

// hooks import
import { useAuthenticated } from '@hooks/isAuthenticated'

export default function Dashboard() {
  const isAuthenticated = useAuthenticated()

  return (
    <>
      { isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" /> }
    </>
  )
}
