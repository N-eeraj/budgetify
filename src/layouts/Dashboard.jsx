// react imports
import { useEffect } from 'react'

// react router imports
import { Outlet, Navigate } from 'react-router'

// redux toolkit imports
import { useDispatch } from 'react-redux'
import { setBudgets } from '@store/budgets'
import { setExpenses } from '@store/expenses'
import { setAllocations } from '@store/allocations'

// material ui imports
import Container from '@mui/material/Container'

// hooks imports
import { useAuthenticated } from '@hooks/useAuthenticated'

export default function Dashboard() {
  const isAuthenticated = useAuthenticated()

  const dispatch = useDispatch()
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(setBudgets())
      dispatch(setExpenses())
      dispatch(setAllocations())
    }
  }, [])

  return (
    isAuthenticated ?
      <Container sx={{
        paddingX: {
          xs: 2,
          md: 3,
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
