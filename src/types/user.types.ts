import { USER_ROLE } from '@components/constants';

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export type User = {
    id: string;
    fullName: string;
    email: string;
    password: string;
    role?: UserRole;
};
