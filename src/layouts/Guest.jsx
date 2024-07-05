// react router imports
import { Outlet, Navigate } from 'react-router'

// hooks import
import { useAuthenticated } from '@hooks/isAuthenticated'

export default function Guest() {
  const isAuthenticated = useAuthenticated()

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />
}
