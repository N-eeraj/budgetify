import { useRoutes } from 'react-router';
import Home from '@pages/Home'
import NotFound from '@pages/NotFound'
import authRouter from '@router/auth';


function appRouter() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Home />
    },
    ...authRouter,
    {
      path: '/*',
      element: <NotFound />
    },
  ])

  return routes
}

export default appRouter
