import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '@layouts/RootLayout';

import ErrorPage from '@containers/exception/Error.container';
import NotFoundPage from '@containers/exception/NotFound.container';
import Home from '@containers/home/Home.container';
import Login from '@containers/login/Login.container';
import Signup from '@containers/signup/Signup.container';

import PublicRoute from './PublicRoute';
import { ROUTES, ROUTES_SEGMENTS } from './routes';
import AddRestaurant from '@containers/addRestaurant/addRestaurant';
import EditRestaurant from '@containers/editRestaurant/editRestaurant';
import Restaurant from '@containers/restaurant/Restaurant';
import RoleGuard from './RoleGuard/RoleGuard';
import AddMenuItem from '@containers/addMenuItem/addMenuItem';
import EditMenuItem from '@containers/editMenuItem/editMenuItem';
import { USER_ROLE } from '@components/constants';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

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

                            {
                                path: ROUTES_SEGMENTS.MENU_ITEMS.ADD_MENU_ITEM,
                                element: <AddMenuItem />,
                            },

                            {
                                path: ROUTES_SEGMENTS.MENU_ITEMS.EDIT_MENU_ITEM,
                                element: <EditMenuItem />,
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
