import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '@layouts/RootLayout';

import ErrorPage from '@containers/exception/ErrorPage';
import NotFoundPage from '@containers/exception/NotFoundPage';
import Home from '@containers/home';
import Login from '@containers/login';
import Signup from '@containers/signup';

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
