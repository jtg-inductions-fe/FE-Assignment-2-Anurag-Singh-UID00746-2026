import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@layouts/RootLayout';

import PublicRoute from './PublicRoute';
import RoleGuard from './RoleGuard/RoleGuard';
import { ROUTES, ROUTES_SEGMENTS } from './routes';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import { USER_ROLE } from '@components/constants';
import { ErrorPage, NotFoundPage } from '@containers/Exception';
import { Home } from '@containers/Home';
import { Login } from '@containers/Login';
import { Signup } from '@containers/Signup';
import { Restaurant } from '@containers/Restaurant';
import { AddRestaurant } from '@containers/AddRestaurant';
import { EditRestaurant } from '@containers/EditRestaurant';
import { AddMenuItem } from '@containers/AddMenuItem';
import { EditMenuItem } from '@containers/EditMenuItem';
import { Cart } from '@containers/CartPage';
import { OrdersPage } from '@containers/OrdersPage';

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
                                element: <Cart />,
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
