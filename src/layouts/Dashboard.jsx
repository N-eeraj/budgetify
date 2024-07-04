// react router imports
import { Outlet, Navigate } from 'react-router'

// redux toolkit imports
import { useSelector } from 'react-redux'

export default function Dashboard() {
  const { user } = useSelector(({ main }) => main)

  return (
    <div>
      <h1>
        Dashboard
      </h1>
      { user ? <Outlet /> : <Navigate to='/sign-in' /> }
    </div>
  )
}
