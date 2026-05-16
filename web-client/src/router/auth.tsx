import Register from '@pages/auth/Register'
import Login from '@pages/auth/Login'
import ResetPassword from '@pages/auth/ResetPassword'

const authRoutes = [
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/reset-password/:token',
    element: <ResetPassword />
  },
]

export default authRoutes
