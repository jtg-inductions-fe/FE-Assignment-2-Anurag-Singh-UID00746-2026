import { LoginCredential, SignupCredential } from '@features/auth/auth.types';
import { User } from '@types';
import {
    deleteUser,
    getCurrentUser,
    login,
    logout,
    refreshAccessToken,
    register,
    updateUser,
} from '@api/auth.api';

export const authService = {
    login: async (credential: LoginCredential): Promise<User> => {
        await login({
            email: credential.email,
            password: credential.password,
        });

        return await getCurrentUser();
    },

    signup: async (credential: SignupCredential): Promise<void> => {
        await register({
            name: credential.fullName,
            email: credential.email,
            password: credential.password,
            role: credential.role,
            address: credential.address,
        });
    },

    updateUser: async (data: Partial<User>): Promise<void> => {
        await updateUser(data);
    },

    deleteUser: async (): Promise<void> => {
        await deleteUser();
    },

    refreshAccessToken: async (): Promise<void> => {
        await refreshAccessToken();
    },

    logout: async (): Promise<void> => {
        await logout();
    },

    getCurrentUser: async (): Promise<User> => {
        return await getCurrentUser();
    },
};
