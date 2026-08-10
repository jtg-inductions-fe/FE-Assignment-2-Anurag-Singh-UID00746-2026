import { UserRole } from '@types';

export interface LoginCredential {
    email: string;
    password: string;
}

export interface SignupCredential {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role?: UserRole;
}
