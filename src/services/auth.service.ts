import { LoginCredential, SignupCredential } from '@features/auth/auth.types';
import { users } from '@mock/user';

import { User } from '../types/user.types';

export const authService = {
    /**
     *
     * @param email: user's email as string
     * @returns authenticated user after verifying the credentials
     */
    login: async ({ email }: LoginCredential) => {
        await new Promise((res) => setTimeout(res, 2000));

        const validated = users.find(
            (user) => user.email.toLowerCase() === email.toLowerCase(),
        );

        if (!validated) {
            throw new Error('Invalid email or password');
        }

        return validated;
    },

    /**
     *
     * @param data: user's credentials taken through the signup form
     * @returns a new user after storing with its credentials
     */
    signup: async (data: SignupCredential) => {
        await new Promise((res) => setTimeout(res, 2000));

        const existing = users.find(
            (user) => user.email.toLowerCase() === data.email.toLowerCase(),
        );

        if (existing) {
            throw new Error('User already exists');
        }

        const newUser: User = {
            id: crypto.randomUUID(),
            fullName: data.fullName,
            email: data.email,
            password: data.password,
            role: data.role,
        };

        return newUser;
    },
};
