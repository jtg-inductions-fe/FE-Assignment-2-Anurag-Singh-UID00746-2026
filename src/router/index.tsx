import { createBrowserRouter } from 'react-router-dom';

import AddMenuItem from '@containers/addMenuItem/addMenuItem';
import AddRestaurant from '@containers/addRestaurant/addRestaurant';
import CartPage from '@containers/cartPage/cartPage';
import EditMenuItem from '@containers/editMenuItem/editMenuItem';
import EditRestaurant from '@containers/editRestaurant/editRestaurant';
import ErrorPage from '@containers/exception/ErrorPage';
import NotFoundPage from '@containers/exception/NotFoundPage';
import Home from '@containers/home';
import Login from '@containers/login';
import Restaurant from '@containers/restaurant/Restaurant';
import Signup from '@containers/signup';
import RootLayout from '@layouts/RootLayout';

import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import PublicRoute from './PublicRoute';
import RoleGuard from './RoleGuard/RoleGuard';
import { ROUTES, ROUTES_SEGMENTS } from './routes';
import { USER_ROLE } from '../types/user.types';
import OrdersPage from '@containers/ordersPage/ordersPage';

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

                        children: [
                            {
                                path: ROUTES_SEGMENTS.CART,
                                element: <CartPage />,
                            },
                        ],
                    },
                    {
                        element: (
                            <RoleGuard
                                allowedRoles={[
                                    USER_ROLE.CUSTOMER,
                                    USER_ROLE.OWNER,
                                ]}
                            />
                        ),

                        children: [
                            {
                                path: ROUTES_SEGMENTS.ORDERS,
                                element: <OrdersPage />,
                            },
                        ],
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
