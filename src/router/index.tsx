import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@layouts/RootLayout';

import PublicRoute from './PublicRoute';
import RoleGuard from './RoleGuard/RoleGuard';
import { ROUTES, ROUTES_SEGMENTS } from './routes';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import { USER_ROLE } from '@components/constants';
import { AddRestaurant } from '@containers/AddRestaurant';
import { EditRestaurant } from '@containers/EditRestaurant';
import { AddMenuItem } from '@containers/AddMenuItem';
import { EditMenuItem } from '@containers/EditMenuItem';
import { DiscoveryPage } from '@pages/Discovery';
import { LoginPage } from '@pages/Login';
import { SignupPage } from '@pages/Signup';
import { RestaurantDetailsPage } from '@pages/RestaurantDetails';
import { CartPage } from '@pages/Cart';
import { OrdersPage } from '@pages/Orders';
import { ErrorPage } from '@pages/Error';
import { NotFoundPage } from '@pages/NotFound';

export const router = createBrowserRouter([
    {
        path: ROUTES.ROOT,
        element: <RootLayout />,
        errorElement: <ErrorPage />,

        children: [
            {
                index: true,
                element: <DiscoveryPage />,
            },

            {
                element: <PublicRoute />,

                children: [
                    {
                        path: ROUTES_SEGMENTS.AUTH.LOGIN,
                        element: <LoginPage />,
                    },
                    {
                        path: ROUTES_SEGMENTS.AUTH.SIGNUP,
                        element: <SignupPage />,
                    },
                    {
                        path: ROUTES_SEGMENTS.RESTAURANTS.RESTAURANT_DETAILS,
                        element: <RestaurantDetailsPage />,
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
