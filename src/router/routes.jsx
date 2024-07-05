// layout imports
import MainWrapper from '@layouts/Main'
import DashboardLayout from '@layouts/Dashboard'
import GuestWrapper from '@layouts/Guest'

// page imports
import Home from '@pages/Home'
import SignIn from '@pages/SignIn'
import SignUp from '@pages/SignUp'
import Dashboard from '@pages/Dashboard'
import Profile from '@pages/Dashboard/Profile'

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
            index: true,
            element: <Dashboard />,
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
