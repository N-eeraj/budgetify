// react router imports
import { Outlet, Navigate } from 'react-router'

// redux toolkit imports
import { useSelector } from 'react-redux'

export default function Guest() {
  const { user } = useSelector(({ main }) => main)

  return user ? <Navigate to='/dashboard' /> : <Outlet />
}
