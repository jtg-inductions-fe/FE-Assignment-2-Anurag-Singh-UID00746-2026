export const USER_ROLE = {
    GUEST: 'guest',
    CUSTOMER: 'customer',
    OWNER: 'owner',
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export type User = {
    id: string;
    fullName: string;
    email: string;
    password: string;
    role?: UserRole;
};
