import { Permission } from './permissions';

export const DISCOVERY_ACTION = [
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
] as const;

export type DiscoveryAction = (typeof DISCOVERY_ACTION)[number];
