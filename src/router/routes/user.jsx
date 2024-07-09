// react router import
import { Navigate } from 'react-router'

// layout import
import DashboardLayout from '@layouts/Dashboard'

// page imports
import Dashboard from '@pages/Dashboard'
import Budgets from '@pages/Dashboard/Budgets'
import Expenses from '@pages/Dashboard/Expenses'
import Profile from '@pages/Dashboard/Profile'

export default {
  path: 'dashboard/',
  element: <DashboardLayout />,
  children: [
    {
      element: <Dashboard />,
      children: [
        {
          index: true,
          element: <Navigate to="budgets" />,
        },
        {
          path: 'budgets',
          element: <Budgets />,
        },
        {
          path: 'expenses',
          element: <Expenses />,
        },
        {
          path: '*',
          element: <Navigate to="budgets" />,
        }
      ],
    },
    {
      path: 'budget/:id',
      element: <>View Budget</>,
    },
    {
      path: 'profile',
      element: <Profile />,
    },
  ],
}