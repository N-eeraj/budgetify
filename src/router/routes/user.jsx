// react router import
import { Navigate } from 'react-router'

// layout import
import DashboardLayout from '@layouts/Dashboard'

// page imports
import Dashboard from '@pages/Dashboard'
import BudgetList from '@pages/Dashboard/Budgets/List'
import Budget from '@pages/Dashboard/Budgets'
import Expenses from '@pages/Dashboard/Expenses'
import Profile from '@pages/Dashboard/Profile'
import Error from '@pages/Error'

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
          element: <BudgetList />,
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
      element: <Budget />,
      errorElement: <Error />,
    },
    {
      path: 'profile',
      element: <Profile />,
    },
  ],
}