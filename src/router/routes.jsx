// layout imports
import MainWrapper from '@layout/Main'
import DashboardLayout from '@layout/Dashboard'
import GuestWrapper from '@layout/Guest'

// page imports
import Home from '@page/Home'
import SignIn from '@page/SignIn'
import SignUp from '@page/SignUp'
import Dashboard from '@page/Dashboard'
import Profile from '@page/Dashboard/Profile'

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
