import { permission } from '@containers/common/constants';

/** Actions in terms of objects will be used in the header container */
export const HEADER_ACTION = [
    {
        id: 'login',
        permission: permission.VIEW_LOGIN,
        label: 'Login',
    },
    {
        id: 'cart',
        permission: permission.VIEW_CART,
        label: 'Cart',
    },
    {
        id: 'addRestaurant',
        permission: permission.ADD_RESTAURANT,
        label: 'Add Restaurant',
    },
];
