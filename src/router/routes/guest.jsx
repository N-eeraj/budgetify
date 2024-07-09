// layout import
import GuestWrapper from '@layouts/Guest'

// page imports
import Home from '@pages/Home'
import SignIn from '@pages/SignIn'
import SignUp from '@pages/SignUp'

export default {
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
}
