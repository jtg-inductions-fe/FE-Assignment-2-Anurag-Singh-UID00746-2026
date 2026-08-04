import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from '@containers/exception/ErrorPage';
import NotFoundPage from '@containers/exception/NotFoundPage';
import Home from '@containers/home';
import Login from '@containers/login';
import Signup from '@containers/signup';
import RootLayout from '@layouts/RootLayout';

import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import PublicRoute from './PublicRoute';
import { ROUTES, ROUTES_SEGMENTS } from './routes';
import AddRestaurant from '@containers/addRestaurant/addRestaurant';
import EditRestaurant from '@containers/editRestaurant/editRestaurant';
import Restaurant from '@containers/Restaurant/Restaurant';
import RoleGuard from './RoleGuard/RoleGuard';
import { USER_ROLE } from '../types/user.types';

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
                    {
                        path: ROUTES_SEGMENTS.RESTAURANTS.RESTAURANT_DETAILS,
                        element: <Restaurant />,
                    },
                ],
            },

            {
                element: <ProtectedRoute />,

                children: [
                    {
                        element: <RoleGuard allowedRoles={[USER_ROLE.OWNER]} />,

                        children: [
                            {
                                path: ROUTES_SEGMENTS.RESTAURANTS
                                    .ADD_RESTAURANT,
                                element: <AddRestaurant />,
                            },

                            {
                                path: ROUTES_SEGMENTS.RESTAURANTS
                                    .EDIT_RESTAURANT,
                                element: <EditRestaurant />,
                            },
                        ],
                    },
                    {
                        element: (
                            <RoleGuard allowedRoles={[USER_ROLE.CUSTOMER]} />
                        ),

                        children: [],
                    },
                ],
            },

            {
                path: ROUTES_SEGMENTS.ERROR.NOT_FOUND,
                element: <NotFoundPage />,
            },
        ],
    },
]);
