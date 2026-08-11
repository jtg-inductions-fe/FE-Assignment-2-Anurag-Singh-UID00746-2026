import { User, UserRole } from '../../types/user.types';

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

export type AuthState = {
    user: User | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    error: string | null;
};
