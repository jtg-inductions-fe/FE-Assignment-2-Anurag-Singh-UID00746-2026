export const ROUTES = {
    ROOT: '/',

    AUTH: {
        LOGIN: '/login',
        SIGNUP: '/signup',
    },

    RESTAURANTS: {
        RESTAURANT_DETAILS: '/restaurants/:id',
        ADD_RESTAURANT: '/restaurants/add',
        EDIT_RESTAURANT: '/restaurants/:id/edit',
    },

    MENU_ITEMS: {
        ADD_MENU_ITEM: '/restaurants/:id/menu/add',
        EDIT_MENU_ITEM: '/restaurants/:id/menu/:menuItemId/edit',
    },

    CART: '/cart',
    ORDERS: '/orders',
} as const;

export const ROUTES_SEGMENTS = {
    AUTH: {
        LOGIN: 'login',
        SIGNUP: 'signup',
    },

    RESTAURANTS: {
        RESTAURANT_DETAILS: 'restaurants/:id',
        ADD_RESTAURANT: 'restaurants/add',
        EDIT_RESTAURANT: 'restaurants/:id/edit',
    },

    MENU_ITEMS: {
        ADD_MENU_ITEM: 'restaurants/:id/menu/add',
        EDIT_MENU_ITEM: 'restaurants/:id/menu/:menuItemId/edit',
    },

    CART: 'cart',
    ORDERS: 'orders',

    ERROR: {
        NOT_FOUND: '*',
    },
} as const;
