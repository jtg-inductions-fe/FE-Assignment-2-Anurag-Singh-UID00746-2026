import { Permission } from './permissions';

/** Actions in terms of objects will be used in the header container */
export const HEADER_ACTION = [
    {
        id: 'login',
        permission: Permission.VIEW_LOGIN,
        label: 'Login',
    },
    {
        id: 'cart',
        permission: Permission.VIEW_CART,
        label: 'Cart',
    },
    {
        id: 'addRestaurant',
        permission: Permission.ADD_RESTAURANT,
        label: 'Add Restaurant',
    },
];
