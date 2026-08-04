import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '@layouts/RootLayout';
import ErrorPage from '@pages/error/ErrorPage';
import NotFoundPage from '@pages/error/NotFoundPage';
import Home from '@pages/home';
import Login from '@pages/login';
import Signup from '@pages/signup';

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
                path: ROUTES_SEGMENTS.AUTH.LOGIN,
                element: <Login />,
            },

            {
                path: ROUTES_SEGMENTS.AUTH.SIGNUP,
                element: <Signup />,
            },

            {
                path: ROUTES_SEGMENTS.ERROR.NOT_FOUND,
                element: <NotFoundPage />,
            },
        ],
    },
]);
