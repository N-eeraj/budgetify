// layout imports
import MainWrapper from '@layouts/Main'
import DashboardLayout from '@layouts/Dashboard'
import GuestWrapper from '@layouts/Guest'

// page imports
import Home from '@pages/Home'
import SignIn from '@pages/SignIn'
import SignUp from '@pages/SignUp'
import Dashboard from '@pages/Dashboard'
import Budgets from '@pages/Dashboard/Budgets'
import Expenses from '@pages/Dashboard/Expenses'
import Profile from '@pages/Dashboard/Profile'
import { Navigate } from 'react-router'

const routes = [
  {
    path: '/',
    element: <MainWrapper />,
    children: [
      {
        element: <GuestWrapper />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: 'sign-in',
            element: <SignIn />,
          },
          {
            path: 'sign-up',
            element: <SignUp />,
          },
        ],
      },
      {
        path: 'dashboard/',
        element: <DashboardLayout />,
        children: [
          {
            element: <Dashboard />,
            children: [
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
                element: <Navigate to="budgets" />
              }
            ],
          },
          {
            path: 'profile',
            element: <Profile />,
          },
        ],
      },
    ],
  },
]

export default routes
