export const USER_ROLE = {
    CUSTOMER: 'customer',
    OWNER: 'owner',
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export type User = {
    id: string;
    username: string;
    email: string;
    password: string;
    role: UserRole;
};
