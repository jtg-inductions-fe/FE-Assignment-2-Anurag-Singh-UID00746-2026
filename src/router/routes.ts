export const ROUTES = {
    ROOT: '/',

    AUTH: {
        LOGIN: '/login',
        SIGNUP: '/signup',
    },

    RESTAURANTS: {
        RESTAURANT_DETAILS: '/restaurants/:id',
        ADD_RESTAURANT: '/restaurants/add',
        EDIT_RESTAURANT: '/restaurants/edit',
    },
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

    ERROR: {
        NOT_FOUND: '*',
    },
} as const;
