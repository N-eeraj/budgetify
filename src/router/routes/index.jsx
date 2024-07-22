// layout import
import MainWrapper from '@layouts/Main'

// routes imports
import guestRoutes from '@router/routes/guest'
import userRoutes from '@router/routes/user'

// page imports
import Error from '@pages/Error'

const routes = [
  {
    path: '/',
    element: <MainWrapper />,
    children: [
      guestRoutes,
      userRoutes,
      {
        path: '*',
        errorElement: <Error />,
        loader: () => {
          throw 'Page Not Found'
        },
      },
    ],
  },
]

export default routes
