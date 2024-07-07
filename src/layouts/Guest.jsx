// react router imports
import { Outlet, Navigate } from 'react-router'

// hooks imports
import { useAuthenticated } from '@hooks/useAuthenticated'

export default function Guest() {
  const isAuthenticated = useAuthenticated()

  return isAuthenticated ? <Navigate to="/dashboard/budgets" /> : <Outlet />
}
