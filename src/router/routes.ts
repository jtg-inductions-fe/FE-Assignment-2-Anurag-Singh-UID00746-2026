export const ROUTES = {
    ROOT: '/',

    AUTH: {
        LOGIN: '/login',
        SIGNUP: '/signup',
    },
} as const;

export const ROUTES_SEGMENTS = {
    AUTH: {
        LOGIN: 'login',
        SIGNUP: 'signup',
    },

    ERROR: {
        NOT_FOUND: '*',
    },
} as const;
