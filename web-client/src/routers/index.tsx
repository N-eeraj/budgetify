import React from 'react'
import { useRoutes } from 'react-router';
import Homepage from '../pages/home'
import Register from '../pages/register'
import Login from '../pages/login'
import Error from '../pages/*'


function appRouter() {
    const routes = useRoutes([
        {
            path: '/',
            element: <Homepage />
        },
        {
            path: '/register',
            element: <Register />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/*',
            element: <Error />
        },
    ])

    return routes
}

export default appRouter