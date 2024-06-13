// layout imports
import MainWrapper from '@layout/Main'
import DashboardLayout from '@layout/Dashboard'

// page imports
import Home from '@page/Home'
import SignIn from '@page/SignIn'
import SignUp from '@page/SignUp'
import Dashboard from '@page/Dashboard'

const routes = [
  {
    path: '/',
    element: <MainWrapper />,
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
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />
          }
        ],
      },
    ],
  },
]

export default routes
