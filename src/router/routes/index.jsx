// routes imports
import guestRoutes from '@router/routes/guest'
import userRoutes from '@router/routes/user'

// layout import
import MainWrapper from '@layouts/Main'

const routes = [
  {
    path: '/',
    element: <MainWrapper />,
    children: [
      guestRoutes,
      userRoutes,
      {
        path: '*',
        element: <>Page Not Found</>,
      },
    ],
  },
]

export default routes
