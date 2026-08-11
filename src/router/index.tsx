import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '@layouts/RootLayout';

import ErrorPage from '@containers/exception/Error.container';
import NotFoundPage from '@containers/exception/NotFound.container';
import Home from '@containers/home/Home.container';
import Login from '@containers/login/Login.container';
import Signup from '@containers/signup/Signup.container';

import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import { ROUTES, ROUTES_SEGMENTS } from './routes';

export const router = createBrowserRouter([
    {
        path: ROUTES.ROOT,
        element: <RootLayout />,
        errorElement: <ErrorPage />,

        children: [
            {
                index: true,
                element: <Home />,
            },

            {
                element: <PublicRoute />,

                children: [
                    {
                        path: ROUTES_SEGMENTS.AUTH.LOGIN,
                        element: <Login />,
                    },
                    {
                        path: ROUTES_SEGMENTS.AUTH.SIGNUP,
                        element: <Signup />,
                    },
                ],
            },

            {
                element: <ProtectedRoute />,
            },

            {
                path: ROUTES_SEGMENTS.ERROR.NOT_FOUND,
                element: <NotFoundPage />,
            },
        ],
    },
]);
