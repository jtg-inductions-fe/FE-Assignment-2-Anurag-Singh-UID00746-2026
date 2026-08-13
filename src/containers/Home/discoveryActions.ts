import { permission } from '@containers/common/constants';

/** Static list of available discovery actions with required guard permissions. */
export const DISCOVERY_ACTION = [
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
] as const;

export type DiscoveryAction = (typeof DISCOVERY_ACTION)[number];
